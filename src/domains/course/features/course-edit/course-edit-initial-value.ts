import type { CourseDetail } from '@/domains/course/api/type';
import { parseDate } from '@/shared/utils/format-date-range';
import type { Tag } from '@/types/tag';

import type {
  CourseCreateDayFormState,
  CourseCreateInitialValue,
} from '../course-create/model';

interface CourseEditTagCatalogs {
  activityTags: Tag[];
  interestTags: Tag[];
  travelStyleTags: Tag[];
}

const getSelectedTagIds = (selectedTagIds: Set<number>, tags: Tag[]) =>
  tags.flatMap(({ id }) => (selectedTagIds.has(id) ? [id] : []));

const getNonEmptyString = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : null;

const convertCourseDetailPlace = (
  place: CourseDetail['days'][number]['places'][number],
): CourseCreateDayFormState['places'][number] => {
  const runtimePlace = place as unknown as {
    googlePlaceId?: unknown;
    placeId?: unknown;
  };
  const googlePlaceId =
    getNonEmptyString(runtimePlace.googlePlaceId) ??
    getNonEmptyString(runtimePlace.placeId);

  if (!googlePlaceId) {
    throw new Error('코스 장소 응답의 Google Place ID가 올바르지 않습니다.');
  }

  return {
    ...place,
    placeId: googlePlaceId,
  };
};

export const convertCourseDetailToInitialValue = (
  course: CourseDetail,
  { activityTags, interestTags, travelStyleTags }: CourseEditTagCatalogs,
): CourseCreateInitialValue => {
  const hasStartDate = course.startDate !== null;
  const hasEndDate = course.endDate !== null;

  if (hasStartDate !== hasEndDate) {
    throw new Error('코스 날짜 응답이 올바르지 않습니다.');
  }

  const sortedDays = [...course.days].sort(
    (firstDay, secondDay) => firstDay.dayNumber - secondDay.dayNumber,
  );

  if (sortedDays.length === 0) {
    throw new Error('코스 일정 응답이 올바르지 않습니다.');
  }

  const selectedTagIds = new Set(course.tags.map(({ tagId }) => tagId));
  const activityTagIds = getSelectedTagIds(selectedTagIds, activityTags);
  const interestTagIds = getSelectedTagIds(selectedTagIds, interestTags);
  const travelStyleTagIds = getSelectedTagIds(selectedTagIds, travelStyleTags);
  const classifiedTagCount = new Set([
    ...activityTagIds,
    ...interestTagIds,
    ...travelStyleTagIds,
  ]).size;

  if (classifiedTagCount !== selectedTagIds.size) {
    throw new Error('코스 태그 응답을 분류하지 못했습니다.');
  }

  const singleCountryId =
    course.countries.length === 1 ? course.countries[0]?.countryId : null;

  return {
    courseId: course.courseId,
    countries: course.countries.map(({ countryId, name }) => ({
      id: countryId,
      name,
    })),
    cities: course.cities.map(({ cityId, koreanName, name }) => ({
      id: cityId,
      name,
      koreanName,
      countryId: singleCountryId ?? null,
    })),
    durationDays: sortedDays.length,
    ...(course.startDate && course.endDate
      ? {
          dateRange: {
            startDate: parseDate(course.startDate),
            endDate: parseDate(course.endDate),
          },
        }
      : {}),
    detail: {
      title: course.title,
      content: course.content ?? '',
      activityTagIds,
      interestTagIds,
      travelStyleTagIds,
    },
    days: sortedDays.map((day) => ({
      dayNumber: day.dayNumber,
      ...(day.date ? { date: day.date } : {}),
      images: day.imageUrls.map((imageUrl) => ({
        type: 'existing' as const,
        imageUrl,
        previewUrl: imageUrl,
      })),
      memo: day.memo ?? '',
      cost: day.cost,
      places: day.places.map(convertCourseDetailPlace),
      flights: day.flights.map((flight) => ({
        airline: flight.airline,
        flightNumber: flight.flightNumber ?? '',
        departureAirport: flight.departureAirport,
        departureTime: flight.departureTime,
        arrivalAirport: flight.arrivalAirport,
        arrivalTime: flight.arrivalTime,
      })),
    })),
  };
};

import type {
  CreateCourseRequest,
  UpdateCourseRequest,
} from '@/domains/course/api/type';
import { formatDateToIsoDate } from '@/shared/utils/format-date-range';

import type { CourseCreateDayFormState, CourseCreateValue } from './model';

const convertCoursePlace = (
  place: CourseCreateDayFormState['places'][number],
  orderNo: number,
): NonNullable<CreateCourseRequest['days'][number]['places']>[number] => {
  const name = place.name?.trim();

  if (!name) {
    throw new Error('이름이 없는 장소는 코스에 추가할 수 없습니다.');
  }

  return {
    googlePlaceId: place.placeId,
    name,
    category: place.category ?? 'ETC',
    ...(typeof place.latitude === 'number' ? { latitude: place.latitude } : {}),
    ...(typeof place.longitude === 'number'
      ? { longitude: place.longitude }
      : {}),
    orderNo,
  };
};

const convertCourseDay = (
  day: CourseCreateDayFormState,
  imageUrls: string[],
): UpdateCourseRequest['days'][number] => {
  if (imageUrls.length !== day.images.length) {
    throw new Error('코스 이미지 업로드 결과가 올바르지 않습니다.');
  }

  const memo = day.memo.trim();

  return {
    dayNumber: day.dayNumber,
    ...(day.date ? { date: day.date } : {}),
    imageUrls,
    ...(memo ? { memo } : {}),
    ...(day.cost !== null ? { cost: day.cost } : {}),
    ...(day.places.length > 0
      ? {
          places: day.places.map(convertCoursePlace),
        }
      : {}),
    ...(day.flights.length > 0
      ? {
          flights: day.flights.map((flight) => {
            const flightNumber = flight.flightNumber.trim();

            return {
              airline: flight.airline,
              ...(flightNumber ? { flightNumber } : {}),
              departureAirport: flight.departureAirport,
              departureTime: flight.departureTime,
              arrivalAirport: flight.arrivalAirport,
              arrivalTime: flight.arrivalTime,
            };
          }),
        }
      : {}),
  };
};

export const convertCourseCreateValueToRequest = (
  value: CourseCreateValue,
  dayImageUrls: string[][],
): CreateCourseRequest => {
  if (dayImageUrls.length !== value.days.length) {
    throw new Error('코스 이미지 업로드 결과가 올바르지 않습니다.');
  }

  const content = value.detail.content.trim();
  const tagIds = [
    ...value.detail.activityTagIds,
    ...value.detail.interestTagIds,
    ...value.detail.travelStyleTagIds,
  ];

  return {
    countryIds: value.countries.map(({ id }) => id),
    cityIds: value.cities.map(({ id }) => id),
    title: value.detail.title.trim(),
    ...(content ? { content } : {}),
    ...(value.dateRange
      ? {
          startDate: formatDateToIsoDate(value.dateRange.startDate),
          endDate: formatDateToIsoDate(value.dateRange.endDate),
        }
      : {}),
    tagIds,
    ...(value.companionUserIds.length > 0
      ? { companionUserIds: value.companionUserIds }
      : {}),
    days: value.days.map((day, index) =>
      convertCourseDay(day, dayImageUrls[index] ?? []),
    ),
  };
};

export const convertCourseUpdateValueToRequest = (
  value: CourseCreateValue,
  dayImageUrls: string[][],
): UpdateCourseRequest => {
  if (dayImageUrls.length !== value.days.length) {
    throw new Error('코스 이미지 업로드 결과가 올바르지 않습니다.');
  }

  const content = value.detail.content.trim();
  const tagIds = [
    ...value.detail.activityTagIds,
    ...value.detail.interestTagIds,
    ...value.detail.travelStyleTagIds,
  ];

  return {
    countryIds: value.countries.map(({ id }) => id),
    cityIds: value.cities.map(({ id }) => id),
    title: value.detail.title.trim(),
    ...(content ? { content } : {}),
    startDate: value.dateRange
      ? formatDateToIsoDate(value.dateRange.startDate)
      : null,
    endDate: value.dateRange
      ? formatDateToIsoDate(value.dateRange.endDate)
      : null,
    tagIds,
    days: value.days.map((day, index) =>
      convertCourseDay(day, dayImageUrls[index] ?? []),
    ),
  };
};

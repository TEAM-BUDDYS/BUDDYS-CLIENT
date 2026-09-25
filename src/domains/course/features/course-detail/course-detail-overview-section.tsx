import type { ReactNode } from 'react';

import type { CourseDetail } from '@/domains/course/api/type';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import {
  CalendarIcon,
  FlightIcon,
  LocationIcon,
  MyIcon,
} from '@/shared/components/icons';
import { Chip, CommonImage, Tag } from '@/shared/components/ui';
import { formatMonthDayWithWeekday } from '@/shared/utils/format-date-range';
import { formatRelativeTime } from '@/shared/utils/format-relative-time';

import { CourseDetailDayMap } from './course-detail-day-map';

type CourseDetailOverviewData = Pick<
  CourseDetail,
  | 'author'
  | 'title'
  | 'content'
  | 'cities'
  | 'startDate'
  | 'tags'
  | 'companions'
  | 'days'
  | 'createdAt'
>;

type CourseDetailDay = CourseDetail['days'][number];
type CourseDetailFlight = CourseDetailDay['flights'][number];

interface CourseDetailOverviewSectionProps {
  course: CourseDetailOverviewData;
}

interface CourseDetailMetaItemProps {
  icon: ReactNode;
  label: string;
}

const AUTHOR_GENDER_LABELS: Record<
  NonNullable<CourseDetail['author']['gender']>,
  string
> = {
  FEMALE: '여',
  MALE: '남',
};

const getAuthorDescription = (course: CourseDetailOverviewData) => {
  const relativeTime = formatRelativeTime(course.createdAt);
  const createdAtLabel =
    relativeTime || formatMonthDayWithWeekday(course.createdAt);
  const genderLabel = course.author.gender
    ? AUTHOR_GENDER_LABELS[course.author.gender]
    : null;

  return [course.author.ageRange, genderLabel, createdAtLabel]
    .filter(Boolean)
    .join(' · ');
};

const getRepresentativeFlight = (
  days: CourseDetailDay[],
): CourseDetailFlight | null => {
  const dayWithFlight = [...days]
    .sort((firstDay, secondDay) => firstDay.dayNumber - secondDay.dayNumber)
    .find((day) => day.flights.length > 0);

  return dayWithFlight?.flights[0] ?? null;
};

const getFlightTime = (dateTime: string) => {
  const time = dateTime.split('T')[1];

  return time?.slice(0, 5) ?? '';
};

const getFlightLabel = (flight: CourseDetailFlight) => {
  const departureTime = getFlightTime(flight.departureAt);
  const arrivalTime = getFlightTime(flight.arrivalAt);
  const departureLabel = [flight.departureAirport, departureTime]
    .filter(Boolean)
    .join(' ');
  const arrivalLabel = [flight.arrivalAirport, arrivalTime]
    .filter(Boolean)
    .join(' ');
  const flightIdentifier = flight.flightNumber ?? flight.airline;

  return `${departureLabel} - ${arrivalLabel} · ${flightIdentifier}`;
};

const CourseDetailMetaItem = ({ icon, label }: CourseDetailMetaItemProps) => {
  return (
    <li className="flex min-w-0 items-center gap-2">
      <span
        aria-hidden
        className="flex size-4 shrink-0 items-center justify-center text-gray-500 [&>svg]:size-4"
      >
        {icon}
      </span>
      <span className="text-body-m-15 min-w-0 text-gray-800">{label}</span>
    </li>
  );
};

export const CourseDetailOverviewSection = ({
  course,
}: CourseDetailOverviewSectionProps) => {
  const cityNames = course.cities.map((city) => city.koreanName);
  const cityLabel = cityNames.join(', ');
  const primaryCityName = cityNames[0];
  const authorDescription = getAuthorDescription(course);
  const startDateLabel = formatMonthDayWithWeekday(course.startDate);
  const participantCount = course.companions.length + 1;
  const representativeFlight = getRepresentativeFlight(course.days);
  const mapDays = course.days.map(({ dayNumber, places }) => ({
    dayNumber,
    places,
  }));
  const profileImage = course.author.profileImageUrl || defaultProfileImage;

  return (
    <section
      aria-labelledby="course-detail-title"
      className="flex w-full flex-col gap-10"
    >
      <div className="flex flex-col gap-6">
        <header className="flex min-w-0 items-center gap-2">
          <CommonImage
            src={profileImage}
            alt=""
            width={44}
            height={44}
            radius="rounded-full"
            unoptimized={Boolean(course.author.profileImageUrl)}
            className="size-11 border border-gray-100"
          />

          <div className="flex min-w-0 flex-col">
            <div className="flex min-w-0 items-center gap-1">
              <strong className="text-body-sb-16 truncate text-gray-800">
                {course.author.nickname ?? '알 수 없는 사용자'}
              </strong>
              {primaryCityName ? <Tag value={primaryCityName} /> : null}
            </div>
            {authorDescription ? (
              <p className="text-body-r-14 truncate text-gray-500">
                {authorDescription}
              </p>
            ) : null}
          </div>
        </header>

        <div className="flex flex-col gap-4">
          <h1
            id="course-detail-title"
            className="text-title-b-20 text-gray-800"
          >
            {course.title}
          </h1>

          <CourseDetailDayMap days={mapDays} />

          <ul className="flex flex-col gap-2">
            {cityLabel ? (
              <CourseDetailMetaItem icon={<LocationIcon />} label={cityLabel} />
            ) : null}
            {startDateLabel ? (
              <CourseDetailMetaItem
                icon={<CalendarIcon />}
                label={startDateLabel}
              />
            ) : null}
            <CourseDetailMetaItem
              icon={<MyIcon />}
              label={`${participantCount}명`}
            />
            {representativeFlight ? (
              <CourseDetailMetaItem
                icon={<FlightIcon />}
                label={getFlightLabel(representativeFlight)}
              />
            ) : null}
          </ul>

          {course.content ? (
            <p className="text-body-m-15 whitespace-pre-line text-gray-800">
              {course.content}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-gray-100 pt-5">
        {course.tags.length > 0 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-body-sb-15 text-gray-800">취향 태그</h2>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Chip key={tag.tagId}>{tag.name}</Chip>
              ))}
            </div>
          </div>
        ) : null}

        <a
          href="#course-day-section"
          className="text-body-sb-16 focus-visible:outline-mint-300 active:border-mint-200 active:bg-mint-50 active:text-mint-300 flex h-13 w-full items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
        >
          날짜 별 코스
        </a>
      </div>
    </section>
  );
};

'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';
import { CourseListCard } from '@/domains/home/components/course-list-card/course-list-card';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { useCountryCourseBookmark } from '@/domains/home/hooks/use-country-course-bookmark';
import { toDisplayableCountryCourses } from '@/domains/home/model/country-course';
import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

const EXCHANGE_COUNTRY_COURSE_SIZE = 3;

const ExchangeCountryCourseList = ({ countryId }: { countryId: number }) => {
  const params = { countryId, size: EXCHANGE_COUNTRY_COURSE_SIZE };
  const { data } = useSuspenseQuery(COURSE_QUERY_OPTIONS.LIST(params));
  const { toggleBookmark } = useCountryCourseBookmark(params);

  const courses = toDisplayableCountryCourses(data.content);

  if (courses.length === 0) {
    return (
      <EmptyState
        title="아직 기록된 코스가 없어요"
        description="첫 번째 코스를 공유해보세요"
        className="py-8"
      />
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {courses.map((course) => (
        <li key={course.courseId}>
          <CourseListCard
            title={course.title}
            description={course.description}
            thumbnailImageUrl={course.thumbnailImageUrl}
            href={ROUTES.COURSE.DETAIL(course.courseId)}
            isBookmarked={course.isBookmarked}
            onBookmarkClick={() =>
              toggleBookmark(course.courseId, course.isBookmarked)
            }
          />
        </li>
      ))}
    </ul>
  );
};

const ExchangeCountryCourseContent = () => {
  const {
    data: { exchangeCountry },
  } = useSuspenseQuery(PROFILE_QUERY_OPTIONS.ME_COUNTRIES());

  // 온보딩에서 파견 정보를 건너뛴 사용자는 섹션을 노출하지 않음
  if (!exchangeCountry) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title={`${exchangeCountry.name}의 코스를 둘러보세요`}
        moreHref={ROUTES.COURSE.SUGGEST_EXPLORE}
      />
      <AsyncBoundary className="py-8">
        <ExchangeCountryCourseList countryId={exchangeCountry.id} />
      </AsyncBoundary>
    </section>
  );
};

export const ExchangeCountryCourseSection = () => {
  return (
    <AsyncBoundary className="py-8">
      <ExchangeCountryCourseContent />
    </AsyncBoundary>
  );
};

'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';
import { CourseTileCard } from '@/domains/home/components/course-tile-card';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { toDisplayableCountryCourses } from '@/domains/home/model/country-course';
import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

const INTEREST_COUNTRY_COURSE_SIZE = 4;

const InterestCountryCourseList = ({ countryId }: { countryId: number }) => {
  const { data } = useSuspenseQuery(
    COURSE_QUERY_OPTIONS.LIST({
      countryId,
      size: INTEREST_COUNTRY_COURSE_SIZE,
    }),
  );

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
    <div className="-mx-4 scrollbar-none overflow-x-auto px-4">
      <div className="flex gap-5">
        {courses.map((course) => (
          <CourseTileCard
            key={course.courseId}
            title={course.title}
            description={course.description}
            image={{
              src: course.thumbnailImageUrl,
              alt: `${course.title} 썸네일`,
            }}
            href={ROUTES.COURSE.DETAIL(course.courseId)}
            className="shrink-0"
          />
        ))}
        <div aria-hidden="true" className="w-2 shrink-0" />
      </div>
    </div>
  );
};

const InterestCountryCourseContent = () => {
  const {
    data: { interestCountry },
  } = useSuspenseQuery(PROFILE_QUERY_OPTIONS.ME_COUNTRIES());

  if (!interestCountry) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title={`${interestCountry.name}의 코스를 둘러보세요`}
        moreHref={ROUTES.COURSE.CUSTOMIZED_EXPLORE}
      />
      <AsyncBoundary className="py-8">
        <InterestCountryCourseList countryId={interestCountry.id} />
      </AsyncBoundary>
    </section>
  );
};

export const InterestCountryCourseSection = () => {
  return (
    <AsyncBoundary className="py-8">
      <InterestCountryCourseContent />
    </AsyncBoundary>
  );
};

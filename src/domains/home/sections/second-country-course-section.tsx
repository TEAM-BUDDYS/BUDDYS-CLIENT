'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';
import type { GetCoursesParams } from '@/domains/course/api/type';
import { CourseListCard } from '@/domains/home/components/course-list-card/course-list-card';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import {
  SectionHeaderSkeleton,
  SkeletonList,
} from '@/domains/home/components/skeleton';
import { useCountryCourseBookmark } from '@/domains/home/hooks/use-country-course-bookmark';
import {
  type DisplayableCountryCourse,
  toDisplayableCountryCourses,
} from '@/domains/home/model/country-course';
import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';
import {
  AsyncBoundary,
  EmptyState,
  HorizontalCardSkeleton,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

const SECOND_COUNTRY_COURSE_SIZE = 3;

const SecondCountryCourseListSkeleton = () => {
  return (
    <SkeletonList
      count={SECOND_COUNTRY_COURSE_SIZE}
      label="코스를 불러오는 중"
      className="flex flex-col gap-5"
    >
      <HorizontalCardSkeleton />
    </SkeletonList>
  );
};

const SecondCountryCourseSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeaderSkeleton />
      <SecondCountryCourseListSkeleton />
    </div>
  );
};

interface SecondCountryCourseItemProps {
  course: DisplayableCountryCourse;
  params: GetCoursesParams;
}

const SecondCountryCourseItem = ({
  course,
  params,
}: SecondCountryCourseItemProps) => {
  const { toggleBookmark } = useCountryCourseBookmark({
    params,
    courseId: course.courseId,
  });

  return (
    <CourseListCard
      title={course.title}
      description={course.description}
      thumbnailImageUrl={course.thumbnailImageUrl}
      createdAt={course.createdAt}
      href={ROUTES.COURSE.DETAIL(course.courseId)}
      isBookmarked={course.isBookmarked}
      onBookmarkClick={() => toggleBookmark(course.isBookmarked)}
    />
  );
};

const SecondCountryCourseList = ({ countryId }: { countryId: number }) => {
  const params = { countryId, size: SECOND_COUNTRY_COURSE_SIZE };
  const { data } = useSuspenseQuery(COURSE_QUERY_OPTIONS.LIST(params));

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
          <SecondCountryCourseItem course={course} params={params} />
        </li>
      ))}
    </ul>
  );
};

const SecondCountryCourseContent = () => {
  const {
    data: { secondSectionCountry },
  } = useSuspenseQuery(PROFILE_QUERY_OPTIONS.ME_COUNTRIES());

  if (!secondSectionCountry) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title={`${secondSectionCountry.name}의 코스를 둘러보세요`}
        moreHref={ROUTES.COURSE.SUGGEST_EXPLORE}
      />
      <AsyncBoundary
        className="py-8"
        loadingFallback={<SecondCountryCourseListSkeleton />}
      >
        <SecondCountryCourseList countryId={secondSectionCountry.id} />
      </AsyncBoundary>
    </section>
  );
};

export const SecondCountryCourseSection = () => {
  return (
    <AsyncBoundary
      className="py-8"
      loadingFallback={<SecondCountryCourseSectionSkeleton />}
    >
      <SecondCountryCourseContent />
    </AsyncBoundary>
  );
};

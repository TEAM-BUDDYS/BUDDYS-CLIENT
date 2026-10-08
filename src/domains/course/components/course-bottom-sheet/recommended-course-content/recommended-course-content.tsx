'use client';

import { useQuery } from '@tanstack/react-query';

import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';
import type {
  GetBookmarkedCoursesParams,
  GetCoursesParams,
} from '@/domains/course/api/type';
import { useCourseBrowse } from '@/domains/course/features/course-browse/course-browse-provider';
import { useCourseBookmarkMutation } from '@/domains/course/hook/use-course-bookmark-mutation';
import {
  COURSE_CATEGORIES,
  COURSE_FILTER_COUNTRIES,
} from '@/domains/course/model/recommended-course';

import { CourseFilterSection } from './course-filter-section';
import { SavedCourseSection } from './saved-course-section';
import { SuggestedCourseSection } from './suggested-course-section';

const DEFAULT_VISIBLE_COURSE_COUNT = 4;
const SAVED_COURSE_QUERY_PARAMS = {
  page: 0,
  size: 3,
} satisfies GetBookmarkedCoursesParams;

interface RecommendedCourseContentProps {
  onExploreClick: () => void;
  onSuggestedMoreClick: () => void;
}

export const RecommendedCourseContent = ({
  onExploreClick,
  onSuggestedMoreClick,
}: RecommendedCourseContentProps) => {
  const {
    selectedRecommendedCategoryId,
    selectedRecommendedCountryId,
    setSelectedRecommendedCategoryId,
    setSelectedRecommendedCountryId,
  } = useCourseBrowse();
  const courseQueryParams = {
    page: 0,
    size: DEFAULT_VISIBLE_COURSE_COUNT,
    ...(selectedRecommendedCountryId === undefined
      ? {}
      : { countryId: selectedRecommendedCountryId }),
  } satisfies GetCoursesParams;
  const suggestedCourseQueryParams = {
    page: 0,
    size: DEFAULT_VISIBLE_COURSE_COUNT,
    tagId: selectedRecommendedCategoryId,
  } satisfies GetCoursesParams;
  const coursesQuery = useQuery(COURSE_QUERY_OPTIONS.LIST(courseQueryParams));
  const suggestedCoursesQuery = useQuery(
    COURSE_QUERY_OPTIONS.LIST(suggestedCourseQueryParams),
  );
  const savedCoursesQuery = useQuery(
    COURSE_QUERY_OPTIONS.BOOKMARKS(SAVED_COURSE_QUERY_PARAMS),
  );
  const courseBookmarkMutation = useCourseBookmarkMutation();
  const courses = coursesQuery.data?.content ?? [];
  const suggestedCourses = suggestedCoursesQuery.data?.content ?? [];
  const savedCourses = savedCoursesQuery.data?.content ?? [];

  const handleCountryChange = (countryId: number) => {
    setSelectedRecommendedCountryId((currentCountryId) =>
      currentCountryId === countryId ? undefined : countryId,
    );
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedRecommendedCategoryId(categoryId);
  };

  const handleCourseBookmarkChange = (
    courseId: number,
    nextBookmarked: boolean,
  ) => {
    if (courseBookmarkMutation.isPending) return;

    courseBookmarkMutation.mutate({
      courseId,
      bookmarked: nextBookmarked,
    });
  };

  return (
    <div className="mb-25">
      <CourseFilterSection
        countries={COURSE_FILTER_COUNTRIES}
        courses={courses}
        hasError={coursesQuery.isError}
        isBookmarkPending={courseBookmarkMutation.isPending}
        isLoading={coursesQuery.isPending}
        selectedCountryId={selectedRecommendedCountryId}
        onCountryChange={handleCountryChange}
        onCourseBookmarkChange={handleCourseBookmarkChange}
        onExploreClick={onExploreClick}
        onRetry={() => void coursesQuery.refetch()}
      />

      <hr
        className="my-6 h-2 border-0 bg-gray-50 opacity-50"
        aria-hidden="true"
      />

      <SuggestedCourseSection
        categories={COURSE_CATEGORIES}
        courses={suggestedCourses}
        hasError={suggestedCoursesQuery.isError}
        isBookmarkPending={courseBookmarkMutation.isPending}
        isLoading={suggestedCoursesQuery.isPending}
        selectedCategoryId={selectedRecommendedCategoryId}
        onCategoryChange={handleCategoryChange}
        onCourseBookmarkChange={handleCourseBookmarkChange}
        onMoreClick={onSuggestedMoreClick}
        onRetry={() => void suggestedCoursesQuery.refetch()}
      />

      <hr
        className="my-6 h-2 border-0 bg-gray-50 opacity-50"
        aria-hidden="true"
      />

      <SavedCourseSection
        courses={savedCourses}
        hasError={savedCoursesQuery.isError}
        isBookmarkPending={courseBookmarkMutation.isPending}
        isLoading={savedCoursesQuery.isPending}
        onCourseBookmarkChange={handleCourseBookmarkChange}
        onRetry={() => void savedCoursesQuery.refetch()}
      />
    </div>
  );
};

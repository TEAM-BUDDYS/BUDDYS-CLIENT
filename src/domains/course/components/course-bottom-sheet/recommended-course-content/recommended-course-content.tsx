'use client';

import {
  type InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  COURSE_MUTATION_OPTIONS,
  COURSE_QUERY_OPTIONS,
} from '@/domains/course/api/course';
import type {
  CourseListPage,
  GetBookmarkedCoursesParams,
  GetCoursesParams,
} from '@/domains/course/api/type';
import { useCourseBrowse } from '@/domains/course/features/course-browse/course-browse-provider';
import {
  COURSE_CATEGORIES,
  COURSE_FILTER_COUNTRIES,
} from '@/domains/course/model/recommended-course';
import { COURSE_QUERY_KEY } from '@/shared/api';
import { useToast } from '@/shared/components/ui';

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
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const {
    selectedRecommendedCategoryId,
    selectedRecommendedCountryId,
    setSelectedRecommendedCategoryId,
    setSelectedRecommendedCountryId,
  } = useCourseBrowse();
  const activeRecommendedCategoryId =
    selectedRecommendedCategoryId ?? COURSE_CATEGORIES[0].id;
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
    tagId: activeRecommendedCategoryId,
  } satisfies GetCoursesParams;
  const coursesQuery = useQuery(COURSE_QUERY_OPTIONS.LIST(courseQueryParams));
  const suggestedCoursesQuery = useQuery(
    COURSE_QUERY_OPTIONS.LIST(suggestedCourseQueryParams),
  );
  const savedCoursesQuery = useQuery(
    COURSE_QUERY_OPTIONS.BOOKMARKS(SAVED_COURSE_QUERY_PARAMS),
  );
  const courseBookmarkMutation = useMutation({
    ...COURSE_MUTATION_OPTIONS.UPDATE_BOOKMARK(),
    onSuccess: ({ courseId, bookmarked }) => {
      queryClient.setQueriesData<CourseListPage>(
        { queryKey: COURSE_QUERY_KEY.LISTS_ALL() },
        (coursePage) =>
          coursePage && {
            ...coursePage,
            content: coursePage.content.map((course) =>
              course.courseId === courseId
                ? { ...course, isBookmarked: bookmarked }
                : course,
            ),
          },
      );
      queryClient.setQueriesData<InfiniteData<CourseListPage>>(
        { queryKey: COURSE_QUERY_KEY.INFINITE_LISTS_ALL() },
        (coursePages) =>
          coursePages && {
            ...coursePages,
            pages: coursePages.pages.map((coursePage) => ({
              ...coursePage,
              content: coursePage.content.map((course) =>
                course.courseId === courseId
                  ? { ...course, isBookmarked: bookmarked }
                  : course,
              ),
            })),
          },
      );

      if (!bookmarked) {
        queryClient.setQueriesData<CourseListPage>(
          { queryKey: COURSE_QUERY_KEY.BOOKMARKS_ALL() },
          (coursePage) =>
            coursePage && {
              ...coursePage,
              content: coursePage.content.filter(
                (course) => course.courseId !== courseId,
              ),
            },
        );
      }

      void queryClient.invalidateQueries({
        queryKey: COURSE_QUERY_KEY.BOOKMARKS_ALL(),
      });
      void queryClient.invalidateQueries({
        queryKey: COURSE_QUERY_KEY.DETAIL(courseId),
      });
    },
    onError: () => {
      showToast('북마크를 변경하지 못했어요. 다시 시도해 주세요.', {
        variant: 'gray',
      });
    },
  });
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
        selectedCategoryId={activeRecommendedCategoryId}
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

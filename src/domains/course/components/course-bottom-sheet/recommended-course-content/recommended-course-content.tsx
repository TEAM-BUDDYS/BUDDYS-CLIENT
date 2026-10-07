'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import {
  COURSE_MUTATION_OPTIONS,
  COURSE_QUERY_OPTIONS,
} from '@/domains/course/api/course';
import type {
  CourseListPage,
  GetBookmarkedCoursesParams,
} from '@/domains/course/api/type';
import { useCourseBrowse } from '@/domains/course/features/course-browse/course-browse-provider';
import {
  COURSE_CATEGORIES,
  COURSE_CITIES,
  COURSE_FILTER_COUNTRIES,
} from '@/domains/course/model/recommended-course';
import { COURSE_QUERY_KEY } from '@/shared/api';
import { useToast } from '@/shared/components/ui';

import {
  CourseFilterSection,
  type FilteredCourseItem,
} from './course-filter-section';
import { SavedCourseSection } from './saved-course-section';
import { SuggestedCourseSection } from './suggested-course-section';

const COURSE_IMAGES = [
  '/images/og_image.png',
  '/icons/buddys-pwa-logo-192.png',
  '/icons/buddys-pwa-logo-512.png',
  '/apple-icon.png',
] as const;

const DEFAULT_VISIBLE_COURSE_COUNT = 4;
const SAVED_COURSE_QUERY_PARAMS = {
  page: 0,
  size: 3,
} satisfies GetBookmarkedCoursesParams;
const INITIAL_COURSES: readonly FilteredCourseItem[] =
  COURSE_FILTER_COUNTRIES.map((country, index) => ({
    id: index + 1,
    countryIds: [country.id],
    tagIds: [COURSE_CATEGORIES[index % COURSE_CATEGORIES.length].id],
    title: `${country.name} 추천 코스`,
    description: `${country.name} · ${COURSE_CITIES[index]}`,
    images: COURSE_IMAGES,
    isBookmarked: false,
  }));

const INITIAL_SUGGESTED_COURSES: readonly FilteredCourseItem[] =
  COURSE_CATEGORIES.map((category, index) => ({
    id: index + 101,
    countryIds: [COURSE_FILTER_COUNTRIES[index].id],
    tagIds: [category.id],
    title: `${category.name} 추천 코스`,
    description: `${COURSE_FILTER_COUNTRIES[index].name} · ${COURSE_CITIES[index]}`,
    images: COURSE_IMAGES,
    isBookmarked: false,
  }));

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
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [suggestedCourses, setSuggestedCourses] = useState(
    INITIAL_SUGGESTED_COURSES,
  );
  const savedCoursesQuery = useQuery(
    COURSE_QUERY_OPTIONS.BOOKMARKS(SAVED_COURSE_QUERY_PARAMS),
  );
  const savedCourseBookmarkMutation = useMutation({
    ...COURSE_MUTATION_OPTIONS.UPDATE_BOOKMARK(),
    onSuccess: ({ courseId, bookmarked }) => {
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
    },
    onError: () => {
      showToast('북마크를 변경하지 못했어요. 다시 시도해 주세요.', {
        variant: 'gray',
      });
    },
  });
  const savedCourses = savedCoursesQuery.data?.content ?? [];
  const activeRecommendedCategoryId =
    selectedRecommendedCategoryId ?? COURSE_CATEGORIES[0].id;
  const filteredCourses =
    selectedRecommendedCountryId === undefined
      ? courses.slice(0, DEFAULT_VISIBLE_COURSE_COUNT)
      : courses.filter((course) =>
          course.countryIds.includes(selectedRecommendedCountryId),
        );
  const filteredSuggestedCourses = suggestedCourses.filter((course) =>
    course.tagIds.includes(activeRecommendedCategoryId),
  );

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
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? { ...course, isBookmarked: nextBookmarked }
          : course,
      ),
    );
  };

  const handleSuggestedCourseBookmarkChange = (
    courseId: number,
    nextBookmarked: boolean,
  ) => {
    setSuggestedCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? { ...course, isBookmarked: nextBookmarked }
          : course,
      ),
    );
  };

  const handleSavedCourseBookmarkChange = (
    courseId: number,
    nextBookmarked: boolean,
  ) => {
    if (savedCourseBookmarkMutation.isPending) return;

    savedCourseBookmarkMutation.mutate({
      courseId,
      bookmarked: nextBookmarked,
    });
  };

  return (
    <div className="mb-25">
      <CourseFilterSection
        countries={COURSE_FILTER_COUNTRIES}
        courses={filteredCourses}
        selectedCountryId={selectedRecommendedCountryId}
        onCountryChange={handleCountryChange}
        onCourseBookmarkChange={handleCourseBookmarkChange}
        onExploreClick={onExploreClick}
      />

      <hr
        className="my-6 h-2 border-0 bg-gray-50 opacity-50"
        aria-hidden="true"
      />

      <SuggestedCourseSection
        categories={COURSE_CATEGORIES}
        courses={filteredSuggestedCourses}
        selectedCategoryId={activeRecommendedCategoryId}
        onCategoryChange={handleCategoryChange}
        onCourseBookmarkChange={handleSuggestedCourseBookmarkChange}
        onMoreClick={onSuggestedMoreClick}
      />

      <hr
        className="my-6 h-2 border-0 bg-gray-50 opacity-50"
        aria-hidden="true"
      />

      <SavedCourseSection
        courses={savedCourses}
        hasError={savedCoursesQuery.isError}
        isBookmarkPending={savedCourseBookmarkMutation.isPending}
        isLoading={savedCoursesQuery.isPending}
        onCourseBookmarkChange={handleSavedCourseBookmarkChange}
        onRetry={() => void savedCoursesQuery.refetch()}
      />
    </div>
  );
};

'use client';

import { useState } from 'react';

import {
  COURSE_CATEGORIES,
  COURSE_FILTER_COUNTRIES,
} from '@/domains/course/model/recommended-course';

import {
  CourseFilterSection,
  type FilteredCourseItem,
} from './course-filter-section';
import { SavedCourseSection } from './saved-course-section';
import { SuggestedCourseSection } from './suggested-course-section';

const COURSE_IMAGES = [
  { src: '/images/og_image.png', alt: '코스 장소 이미지 1' },
  { src: '/icons/buddys-pwa-logo-192.png', alt: '코스 장소 이미지 2' },
  { src: '/icons/buddys-pwa-logo-512.png', alt: '코스 장소 이미지 3' },
  { src: '/apple-icon.png', alt: '코스 장소 이미지 4' },
];

const INITIAL_COURSES: readonly FilteredCourseItem[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: index + 1,
    title: '프라하 3박 4일 (코스 제목)',
    description: '체코 · 프라하',
    images: COURSE_IMAGES,
    isBookmarked: false,
  }),
);

const INITIAL_SUGGESTED_COURSES: readonly FilteredCourseItem[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: index + 101,
    title: '프라하 3박 4일 (코스 제목)',
    description: '체코 · 프라하',
    images: COURSE_IMAGES,
    isBookmarked: false,
  }),
);

const INITIAL_SAVED_COURSES: readonly FilteredCourseItem[] = Array.from(
  { length: 3 },
  (_, index) => ({
    id: index + 201,
    title: '프라하 3박 4일 (코스 제목)',
    description: '체코 · 프라하',
    images: COURSE_IMAGES,
    isBookmarked: true,
  }),
);

interface RecommendedCourseContentProps {
  onExploreClick?: () => void;
  onSuggestedMoreClick?: () => void;
}

export const RecommendedCourseContent = ({
  onExploreClick,
  onSuggestedMoreClick,
}: RecommendedCourseContentProps) => {
  const [selectedCountryId, setSelectedCountryId] = useState<number>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [suggestedCourses, setSuggestedCourses] = useState(
    INITIAL_SUGGESTED_COURSES,
  );
  const [savedCourses, setSavedCourses] = useState(INITIAL_SAVED_COURSES);

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
    if (!nextBookmarked) {
      setSavedCourses((currentCourses) =>
        currentCourses.filter((course) => course.id !== courseId),
      );
    }
  };

  return (
    <div>
      <CourseFilterSection
        countries={COURSE_FILTER_COUNTRIES}
        courses={courses}
        selectedCountryId={selectedCountryId}
        onCountryChange={setSelectedCountryId}
        onCourseBookmarkChange={handleCourseBookmarkChange}
        onExploreClick={onExploreClick}
      />

      <hr
        className="my-6 h-2 border-0 bg-gray-50 opacity-50"
        aria-hidden="true"
      />

      <SuggestedCourseSection
        categories={COURSE_CATEGORIES}
        courses={suggestedCourses}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        onCourseBookmarkChange={handleSuggestedCourseBookmarkChange}
        onMoreClick={onSuggestedMoreClick}
      />

      <hr
        className="my-6 h-2 border-0 bg-gray-50 opacity-50"
        aria-hidden="true"
      />

      <SavedCourseSection
        courses={savedCourses}
        onCourseBookmarkChange={handleSavedCourseBookmarkChange}
      />
    </div>
  );
};

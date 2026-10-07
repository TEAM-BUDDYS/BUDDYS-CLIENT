'use client';

import { useState } from 'react';

import { COURSE_CATEGORIES } from '@/domains/course/model/recommended-course';
import { Header } from '@/shared/components/layout';
import { CardList, ChipButton } from '@/shared/components/ui';

const COURSE_IMAGES = [
  '/images/og_image.png',
  '/icons/buddys-pwa-logo-192.png',
  '/icons/buddys-pwa-logo-512.png',
  '/apple-icon.png',
];
const INITIAL_COURSES = COURSE_CATEGORIES.map((category) => ({
  id: category.id,
  categoryId: category.id,
  title: '프라하 3박 4일 (코스 제목)',
  description: '체코 · 프라하',
  images: COURSE_IMAGES,
  isBookmarked: false,
}));

export const SuggestExplore = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const visibleCourses =
    selectedCategoryId === undefined
      ? courses
      : courses.filter((course) => course.categoryId === selectedCategoryId);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId((currentCategoryId) =>
      currentCategoryId === categoryId ? undefined : categoryId,
    );
  };

  const handleBookmarkClick = (courseId: number) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? { ...course, isBookmarked: !course.isBookmarked }
          : course,
      ),
    );
  };

  return (
    <>
      <Header hasBackButton />

      <main className="pb-20">
        <section className="flex flex-col gap-3">
          <h1 className="text-title-b-20 px-4 text-gray-800">
            이런 코스는 어떠세요?
          </h1>

          <div className="flex scrollbar-none gap-2 overflow-x-auto overscroll-x-none px-4 [&::-webkit-scrollbar]:hidden">
            {COURSE_CATEGORIES.map((category) => (
              <ChipButton
                key={category.id}
                active={selectedCategoryId === category.id}
                variant="fillMedium"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </ChipButton>
            ))}
          </div>

          <div className="flex flex-col gap-3 px-4">
            {visibleCourses.map((course) => (
              <CardList
                key={course.id}
                title={course.title}
                description={course.description}
                images={course.images}
                isBookmarked={course.isBookmarked}
                onBookmarkClick={() => handleBookmarkClick(course.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

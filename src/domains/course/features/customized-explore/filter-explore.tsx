'use client';

import { useState } from 'react';

import { COURSE_FILTER_COUNTRIES } from '@/domains/course/model/recommended-course';
import { BottomNavigation, Header } from '@/shared/components/layout';
import { CardList, ChipButton } from '@/shared/components/ui';

const COURSE_IMAGES = [
  { src: '/images/og_image.png', alt: '프라하 코스 장소 이미지 1' },
  {
    src: '/icons/buddys-pwa-logo-192.png',
    alt: '프라하 코스 장소 이미지 2',
  },
  {
    src: '/icons/buddys-pwa-logo-512.png',
    alt: '프라하 코스 장소 이미지 3',
  },
  { src: '/apple-icon.png', alt: '프라하 코스 장소 이미지 4' },
];
const INITIAL_COURSES = COURSE_FILTER_COUNTRIES.map((country) => ({
  id: country.id,
  countryId: country.id,
  title: '프라하 3박 4일 (코스 제목)',
  description: '체코 · 프라하',
  images: COURSE_IMAGES,
  isBookmarked: false,
}));

export const FilterExplore = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<number>();
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const visibleCourses =
    selectedCountryId === undefined
      ? courses
      : courses.filter((course) => course.countryId === selectedCountryId);

  const handleCountryClick = (countryId: number) => {
    setSelectedCountryId((currentCountryId) =>
      currentCountryId === countryId ? undefined : countryId,
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
            나에게 딱 맞는 코스를 찾아보세요
          </h1>

          <div className="flex scrollbar-none gap-2 overflow-x-auto overscroll-x-none px-4 [&::-webkit-scrollbar]:hidden">
            {COURSE_FILTER_COUNTRIES.map((country) => (
              <ChipButton
                key={country.id}
                active={selectedCountryId === country.id}
                variant="fillMedium"
                onClick={() => handleCountryClick(country.id)}
              >
                {country.name}
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

      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
    </>
  );
};

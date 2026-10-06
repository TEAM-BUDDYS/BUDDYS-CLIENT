'use client';

import { useState } from 'react';

import { CourseListCard } from '@/domains/home/components/course-list-card/course-list-card';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { ROUTES } from '@/shared/config';

// TODO: 파견 국가 코스 API 연동 시 응답 데이터로 교체
const MOCK_EXCHANGE_COUNTRY = '프랑스';

const MOCK_EXCHANGE_COUNTRY_COURSES = [
  {
    courseId: 11,
    title: '파리 하루 코스',
    description: '에펠탑부터 몽마르뜨 언덕까지 하루 만에 둘러봐요',
    isBookmarked: false,
  },
  {
    courseId: 12,
    title: '니스 해변 산책',
    description: '프랑스 · 1박 2일',
    isBookmarked: false,
  },
  {
    courseId: 13,
    title: '리옹 미식 투어',
    description: '부숑 맛집과 구시가지 골목 탐방',
    isBookmarked: false,
  },
].map((course) => ({
  ...course,
  thumbnailImageUrl: `https://picsum.photos/seed/exchange-course-${course.courseId}/200/200`,
}));

export const ExchangeCountryCourseSection = () => {
  const [courses, setCourses] = useState(MOCK_EXCHANGE_COUNTRY_COURSES);

  const handleBookmarkClick = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.courseId === courseId
          ? { ...course, isBookmarked: !course.isBookmarked }
          : course,
      ),
    );
  };

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title={`${MOCK_EXCHANGE_COUNTRY}의 코스를 둘러보세요`}
        moreHref={ROUTES.COURSE.SUGGEST_EXPLORE}
      />
      <ul className="flex flex-col gap-5">
        {courses.map(({ courseId, ...course }) => (
          <li key={courseId}>
            <CourseListCard
              {...course}
              href={ROUTES.COURSE.DETAIL(courseId)}
              onBookmarkClick={() => handleBookmarkClick(courseId)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

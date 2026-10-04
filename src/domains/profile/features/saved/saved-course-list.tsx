'use client';

import { useState } from 'react';

import { CardList } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

// TODO: 저장한 코스 목록 API 연동 시 응답 데이터로 교체
const MOCK_SAVED_COURSES = [
  {
    courseId: 1,
    title: '프라하 3박 4일 핵심 코스',
    description: '체코 · 3박 4일',
    images: [1, 2, 3, 4].map((index) => ({
      src: `https://picsum.photos/seed/saved-course-1-${index}/200/200`,
      alt: `프라하 3박 4일 핵심 코스 이미지 ${index}`,
    })),
    isBookmarked: true,
  },
  {
    courseId: 2,
    title: '런던 미술관 투어',
    description: '영국 · 1박 2일',
    images: [1, 2, 3].map((index) => ({
      src: `https://picsum.photos/seed/saved-course-2-${index}/200/200`,
      alt: `런던 미술관 투어 이미지 ${index}`,
    })),
    isBookmarked: true,
  },
];

export const SavedCourseList = () => {
  const [courses, setCourses] = useState(MOCK_SAVED_COURSES);

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
    <ul className="flex flex-col gap-3">
      {courses.map(({ courseId, ...course }) => (
        <li key={courseId}>
          <CardList
            {...course}
            href={ROUTES.COURSE.DETAIL(courseId)}
            onBookmarkClick={() => handleBookmarkClick(courseId)}
          />
        </li>
      ))}
    </ul>
  );
};

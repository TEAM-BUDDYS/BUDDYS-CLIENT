'use client';

import { useState } from 'react';

import { ListToolbar } from '@/domains/home/components/list-toolbar/list-toolbar';
import { CardList } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

// TODO: 코스 검색 API 연동 시 응답 데이터로 교체
const MOCK_SEARCH_COURSES = [
  {
    courseId: 1,
    title: '바르셀로나 하루 코스',
    description:
      '사그라다 파밀리아부터 보른 지구까지, 하루 만에 둘러볼 수 있는 동선을 담았어요.',
    images: [1, 2, 3, 4].map(
      (index) => `https://picsum.photos/seed/search-course-1-${index}/200/200`,
    ),
    isBookmarked: false,
  },
  {
    courseId: 2,
    title: '런던 미술관 투어',
    description: '영국 · 1박 2일',
    images: [1, 2, 3].map(
      (index) => `https://picsum.photos/seed/search-course-2-${index}/200/200`,
    ),
    isBookmarked: false,
  },
];

export const SearchResultCourseList = () => {
  const [sort, setSort] = useState('최신순');
  const [courses, setCourses] = useState(MOCK_SEARCH_COURSES);

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
    <>
      <ListToolbar count={courses.length} value={sort} onChange={setSort} />

      <ul className="mt-4 flex flex-col gap-5">
        {courses.map(({ courseId, ...course }) => (
          <li key={courseId}>
            <CardList
              {...course}
              href={ROUTES.COURSE.DETAIL(courseId)}
              className="[&_h3]:text-body-sb-15"
              onBookmarkClick={() => handleBookmarkClick(courseId)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

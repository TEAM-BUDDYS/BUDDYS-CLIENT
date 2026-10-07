'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';
import { AsyncBoundary, CardList, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const SAVED_COURSES_PAGE_SIZE = 20;

const SavedCourseItems = () => {
  // TODO: 코스 저장 해제 API 연동 시 mutation으로 교체
  const [unbookmarkedCourseIds, setUnbookmarkedCourseIds] = useState<number[]>(
    [],
  );
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    PROFILE_QUERY_OPTIONS.BOOKMARKED_COURSES_INFINITE({
      size: SAVED_COURSES_PAGE_SIZE,
    }),
  );

  const courses = data.pages.flatMap((page) => page.data?.content ?? []);

  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  const handleBookmarkClick = (courseId: number) => {
    setUnbookmarkedCourseIds((prevCourseIds) =>
      prevCourseIds.includes(courseId)
        ? prevCourseIds.filter((prevCourseId) => prevCourseId !== courseId)
        : [...prevCourseIds, courseId],
    );
  };

  if (courses.length === 0 && !hasNextPage) {
    return (
      <EmptyState
        title="저장한 코스가 없어요"
        description="마음에 드는 코스를 저장해보세요"
        // 목록 영역의 mt-6(24px)과 합쳐 필터바와 125px 간격
        className="pt-25.25"
      />
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-5">
        {courses.map((course) => (
          <li key={course.courseId}>
            <CardList
              title={course.title}
              description={
                course.content ||
                [course.countries, course.cities].filter(Boolean).join(' · ')
              }
              images={course.images.map((src, index) => ({
                src,
                alt: `${course.title} 이미지 ${index + 1}`,
              }))}
              isBookmarked={!unbookmarkedCourseIds.includes(course.courseId)}
              href={ROUTES.COURSE.DETAIL(course.courseId)}
              className="[&_h3]:text-body-sb-15"
              onBookmarkClick={() => handleBookmarkClick(course.courseId)}
            />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          코스를 불러오는 중이에요
        </p>
      )}
      {isFetchNextPageError && (
        <button
          type="button"
          className="text-caption-m-12 text-mint-400 mx-auto block py-4"
          onClick={() => fetchNextPage()}
        >
          다시 불러오기
        </button>
      )}
    </>
  );
};

export const SavedCourseList = () => {
  return (
    <AsyncBoundary
      className="py-8"
      loadingFallback={<div className="min-h-96" aria-busy="true" />}
    >
      <SavedCourseItems />
    </AsyncBoundary>
  );
};

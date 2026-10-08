'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { startTransition, useCallback, useState } from 'react';

import { SEARCH_QUERY_OPTIONS } from '@/domains/home/api/query';
import type { SearchSort } from '@/domains/home/api/type';
import { ListToolbar } from '@/domains/home/components/list-toolbar/list-toolbar';
import {
  getSearchSortByLabel,
  SEARCH_SORT_LABEL,
  searchSortOptions,
} from '@/domains/home/model/search-sort';
import { CardList, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const SEARCH_RESULT_SIZE = 10;

interface SearchResultCourseListProps {
  keyword: string;
}

export const SearchResultCourseList = ({
  keyword,
}: SearchResultCourseListProps) => {
  const [sort, setSort] = useState<SearchSort>('LATEST');
  // TODO: 검색 결과에서 코스 저장 API 연동 시 mutation으로 교체
  const [toggledBookmarkIds, setToggledBookmarkIds] = useState<number[]>([]);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    SEARCH_QUERY_OPTIONS.INFINITE({
      keyword,
      type: 'COURSE',
      sort,
      size: SEARCH_RESULT_SIZE,
    }),
  );

  const courses = data.pages.flatMap(
    (page) => page.data?.courses?.content ?? [],
  );
  const totalCount =
    data.pages[0]?.data?.courses?.totalElements ?? courses.length;
  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  const handleSortChange = (label: string) => {
    startTransition(() => {
      setSort(getSearchSortByLabel(label));
    });
  };

  const handleBookmarkClick = (courseId: number) => {
    setToggledBookmarkIds((prevCourseIds) =>
      prevCourseIds.includes(courseId)
        ? prevCourseIds.filter((prevCourseId) => prevCourseId !== courseId)
        : [...prevCourseIds, courseId],
    );
  };

  if (courses.length === 0 && !hasNextPage) {
    return (
      <EmptyState
        title="검색 결과가 없어요"
        description="다른 검색어로 코스를 찾아보세요"
        className="py-20"
      />
    );
  }

  return (
    <>
      <ListToolbar
        count={totalCount}
        options={searchSortOptions}
        value={SEARCH_SORT_LABEL[sort]}
        onChange={handleSortChange}
      />

      <ul className="mt-4 flex flex-col gap-5">
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
              isBookmarked={
                course.isBookmarked !==
                toggledBookmarkIds.includes(course.courseId)
              }
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

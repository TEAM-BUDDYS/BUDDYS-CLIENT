'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { startTransition, useCallback, useState } from 'react';

import { SEARCH_QUERY_OPTIONS } from '@/domains/home/api/query';
import type { SearchSort } from '@/domains/home/api/type';
import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { ListToolbar } from '@/domains/home/components/list-toolbar/list-toolbar';
import { hasPostCardFields } from '@/domains/home/model/buddy-search';
import {
  getSearchSortByLabel,
  SEARCH_SORT_LABEL,
  searchSortOptions,
} from '@/domains/home/model/search-sort';
import { Card, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const SEARCH_RESULT_SIZE = 10;

interface SearchResultPostListProps {
  keyword: string;
}

export const SearchResultPostList = ({
  keyword,
}: SearchResultPostListProps) => {
  const [sort, setSort] = useState<SearchSort>('LATEST');
  // TODO: 동행 게시글 저장 API 연동 시 mutation으로 교체
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
      type: 'POST',
      sort,
      size: SEARCH_RESULT_SIZE,
    }),
  );

  const posts = data.pages
    .flatMap((page) => page.data?.posts?.content ?? [])
    .filter(hasPostCardFields);
  const totalCount = data.pages[0]?.data?.posts?.totalElements ?? posts.length;
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

  const handleBookmarkClick = (postId: number) => {
    setToggledBookmarkIds((prevPostIds) =>
      prevPostIds.includes(postId)
        ? prevPostIds.filter((prevPostId) => prevPostId !== postId)
        : [...prevPostIds, postId],
    );
  };

  if (posts.length === 0 && !hasNextPage) {
    return (
      <EmptyState
        title="검색 결과가 없어요"
        description="다른 검색어로 동행 게시물을 찾아보세요"
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
        {posts.map((post) => (
          <li key={post.postId}>
            <BookmarkContainer
              isBookmarked={
                Boolean(post.isBookmarked) !==
                toggledBookmarkIds.includes(post.postId)
              }
              variant="card"
              onBookmarkClick={() => handleBookmarkClick(post.postId)}
            >
              <Card
                href={ROUTES.POST.DETAIL(post.postId)}
                title={post.title}
                content={post.content}
                postStatus={post.recruitmentStatus}
                tagValue={post.country.name}
                startDate={post.startDate}
                endDate={post.endDate}
                image={post.thumbnailImageUrl}
              />
            </BookmarkContainer>
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          게시물을 불러오는 중이에요
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

'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import type { FilterSheetValue } from '@/domains/home/features/filter-sheet/use-filter-sheet';
import {
  getBuddySearchParams,
  hasPostCardFields,
} from '@/domains/home/model/buddy-search';
import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { Card, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const CUSTOMIZED_EXPLORE_SIZE = 10;

interface CustomizedExplorePostListProps {
  filterValue: FilterSheetValue;
  keyword?: string;
  bookmarkedItemIds: number[];
  onBookmarkClick: (itemId: number) => void;
}

export const CustomizedExplorePostList = ({
  filterValue,
  keyword,
  bookmarkedItemIds,
  onBookmarkClick,
}: CustomizedExplorePostListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    POST_QUERY_OPTIONS.INFINITE_LIST(
      getBuddySearchParams(filterValue, CUSTOMIZED_EXPLORE_SIZE, keyword),
    ),
  );

  const posts = data.pages
    .flatMap((page) => page.data?.content ?? [])
    .filter(hasPostCardFields);
  const isEmpty = posts.length === 0;
  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  return (
    <div className="flex flex-col gap-6 py-6">
      {isEmpty ? (
        <EmptyState
          title="조건에 맞는 게시물이 없어요"
          description="필터를 조정해 다른 동행 게시물을 찾아보세요"
          className="py-20"
        />
      ) : (
        posts.map((post) => (
          <BookmarkContainer
            key={post.postId}
            isBookmarked={bookmarkedItemIds.includes(post.postId)}
            variant="card"
            onBookmarkClick={() => onBookmarkClick(post.postId)}
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
        ))
      )}
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          게시물을 불러오는 중이에요
        </p>
      )}
      {isFetchNextPageError && (
        <button
          type="button"
          className="text-caption-m-12 text-mint-400 mx-auto py-4"
          onClick={() => fetchNextPage()}
        >
          다시 불러오기
        </button>
      )}
    </div>
  );
};

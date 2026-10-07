'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { ListToolbar } from '@/domains/home/components/list-toolbar/list-toolbar';
import { initialFilterValue } from '@/domains/home/features/filter-sheet/use-filter-sheet';
import {
  getBuddySearchParams,
  hasPostCardFields,
} from '@/domains/home/model/buddy-search';
import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { Card, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const SEARCH_RESULT_SIZE = 10;

interface SearchResultPostListProps {
  keyword?: string;
}

export const SearchResultPostList = ({
  keyword,
}: SearchResultPostListProps) => {
  const [sort, setSort] = useState('최신순');
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    POST_QUERY_OPTIONS.INFINITE_LIST(
      getBuddySearchParams(initialFilterValue, SEARCH_RESULT_SIZE, keyword),
    ),
  );

  const posts = data.pages
    .flatMap((page) => page.data?.content ?? [])
    .filter(hasPostCardFields);
  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  const handleBookmarkClick = (postId: number) => {
    setBookmarkedItemIds((prevBookmarkedItemIds) =>
      prevBookmarkedItemIds.includes(postId)
        ? prevBookmarkedItemIds.filter(
            (bookmarkedItemId) => bookmarkedItemId !== postId,
          )
        : [...prevBookmarkedItemIds, postId],
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
      {/* TODO: 전체 건수와 정렬을 지원하는 검색 API 연동 시 교체 */}
      <ListToolbar count={posts.length} value={sort} onChange={setSort} />

      <ul className="mt-4 flex flex-col gap-5">
        {posts.map((post) => (
          <li key={post.postId}>
            <BookmarkContainer
              isBookmarked={bookmarkedItemIds.includes(post.postId)}
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

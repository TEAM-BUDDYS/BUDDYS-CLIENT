'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { PartnerCard } from '@/domains/partner/components/partner-card/partner-card';
import { FilterSheet } from '@/domains/partner/features/filter-sheet/filter-sheet';
import type { FilterSheetValue } from '@/domains/partner/features/filter-sheet/use-filter-sheet';
import {
  partnerFilterItems,
  type PartnerFilterKey,
} from '@/domains/partner/model/partner-filter';
import {
  getPartnerSearchParams,
  hasPartnerCardFields,
  PARTNER_SEARCH_SIZE,
} from '@/domains/partner/model/partner-search';
import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { cn } from '@/lib/cn';
import { AsyncBoundary, EmptyState, Filter } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';
import { useSheetScroll } from '@/shared/hooks/use-sheet-scroll';

import { usePartnerFilterValue } from './use-partner-filter-value';

interface PostListProps {
  filterValue: FilterSheetValue;
  bookmarkedItemIds: number[];
  onBookmarkClick: (itemId: number) => void;
}

const PostList = ({
  filterValue,
  bookmarkedItemIds,
  onBookmarkClick,
}: PostListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    POST_QUERY_OPTIONS.INFINITE_LIST(
      getPartnerSearchParams(filterValue, PARTNER_SEARCH_SIZE),
    ),
  );

  const posts = data.pages
    .flatMap((page) => page.data?.content ?? [])
    .filter(hasPartnerCardFields);
  const isEmpty = posts.length === 0;
  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  if (isEmpty) {
    return (
      <div>
        <p className="text-caption-m-12 pt-4 text-gray-500">총 0건</p>
        <EmptyState
          title="조건에 맞는 동행 게시물이 없어요"
          description="필터를 바꿔 다른 동행 게시물을 찾아보세요"
          className="py-8"
        />
      </div>
    );
  }

  return (
    <>
      <p className="text-caption-m-12 pt-4 text-gray-500">
        총 {posts.length}건
      </p>
      <div className="flex flex-col gap-6 pt-4">
        {posts.map((post) => (
          <PartnerCard
            key={post.postId}
            href={ROUTES.POST.DETAIL(post.postId)}
            isRecruiting={post.recruitmentStatus === 'RECRUITING'}
            country={post.country.name}
            title={post.title}
            description={post.content}
            startDate={post.startDate}
            endDate={post.endDate}
            imageUrl={post.thumbnailImageUrl}
            isBookmarked={bookmarkedItemIds.includes(post.postId)}
            onBookmarkClick={() => onBookmarkClick(post.postId)}
          />
        ))}
      </div>
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

export const PartnerNowTab = () => {
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const { filterValue, appliedFilterKeys, handleFilterApply } =
    usePartnerFilterValue();
  const { sheetRef, sheetScrollClassName } = useSheetScroll(isFilterSheetOpen);

  const handleFilterPress = (_filterKey: PartnerFilterKey) => {
    setIsFilterSheetOpen(true);
  };

  const handleFilterSheetClose = () => {
    setIsFilterSheetOpen(false);
  };

  const handleBookmarkClick = (itemId: number) => {
    setBookmarkedItemIds((prevBookmarkedItemIds) =>
      prevBookmarkedItemIds.includes(itemId)
        ? prevBookmarkedItemIds.filter(
            (bookmarkedItemId) => bookmarkedItemId !== itemId,
          )
        : [...prevBookmarkedItemIds, itemId],
    );
  };

  return (
    <>
      <section className="flex flex-col">
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-title-b-18 text-gray-800">
            원하는 조건으로 동행 찾기
          </h2>
          <p className="text-body-r-14 text-gray-500">체코 외 1</p>
        </div>

        <div className="flex scrollbar-none gap-2 overflow-x-auto py-3">
          {partnerFilterItems.map((filterItem) => (
            <Filter
              key={filterItem.key}
              label={filterItem.label}
              pressed={appliedFilterKeys.includes(filterItem.key)}
              onPress={() => handleFilterPress(filterItem.key)}
            />
          ))}
          <div aria-hidden="true" className="w-2 shrink-0" />
        </div>

        <hr
          className="-mx-4 h-2 border-0 bg-gray-50 opacity-50"
          aria-hidden="true"
        />

        <AsyncBoundary
          className="py-8"
          resetKeys={[filterValue]}
          loadingFallback={<div className="min-h-96 pt-6" aria-busy="true" />}
        >
          <PostList
            filterValue={filterValue}
            bookmarkedItemIds={bookmarkedItemIds}
            onBookmarkClick={handleBookmarkClick}
          />
        </AsyncBoundary>
      </section>
      {isFilterSheetOpen && (
        <div
          ref={sheetRef}
          className={cn(
            'fixed inset-0 z-50 mx-auto h-dvh max-w-107.5 bg-white',
            sheetScrollClassName,
          )}
        >
          <FilterSheet
            value={filterValue}
            onClose={handleFilterSheetClose}
            onApply={handleFilterApply}
          />
        </div>
      )}
    </>
  );
};

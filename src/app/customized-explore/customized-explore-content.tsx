'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { SearchSheetButton } from '@/domains/home/components/search-sheet-button/search-sheet-button';
import { FilterSheet } from '@/domains/home/features/filter-sheet/filter-sheet';
import { useFilterSheetValue } from '@/domains/home/hooks/use-filter-sheet-value';
import { useSheetScroll } from '@/domains/home/hooks/use-sheet-scroll';
import {
  buddyFilterItems,
  type BuddyFilterKey,
} from '@/domains/home/model/buddy-filter';
import {
  getBuddySearchParams,
  hasPostCardFields,
} from '@/domains/home/model/buddy-search';
import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { cn } from '@/lib/cn';
import { BellIcon } from '@/shared/components/icons';
import { BottomNavigation, Header } from '@/shared/components/layout';
import { Card, EmptyState, Filter } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const CUSTOMIZED_EXPLORE_SIZE = 10;

export const CustomizedExploreContent = () => {
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const { filterValue, appliedFilterKeys, handleFilterApply } =
    useFilterSheetValue();
  const { sheetRef, sheetScrollClassName } = useSheetScroll(isFilterSheetOpen);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      POST_QUERY_OPTIONS.INFINITE_LIST(
        getBuddySearchParams(filterValue, CUSTOMIZED_EXPLORE_SIZE),
      ),
    );

  const posts = (data?.pages ?? [])
    .flatMap((page) => page.data?.content ?? [])
    .filter(hasPostCardFields);
  const isEmpty = posts.length === 0;
  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    onIntersect: handleIntersect,
  });

  const handleFilterPress = (_filterKey: BuddyFilterKey) => {
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
      <Header
        hasBackButton
        right={
          <>
            <SearchSheetButton />
            <button type="button" aria-label="알림">
              <BellIcon className="size-6" />
            </button>
          </>
        }
      />
      <main className="px-4 pb-19">
        <h2 className="text-title-b-20 my-2">
          나에게 딱 맞는 동행을 만나보세요
        </h2>
        <div className="-mx-4 scrollbar-none overflow-x-auto border-b border-gray-100 px-4 pt-2 pb-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2">
            {buddyFilterItems.map((filterItem) => (
              <Filter
                key={filterItem.key}
                label={filterItem.label}
                pressed={appliedFilterKeys.includes(filterItem.key)}
                icon={filterItem.icon}
                onPress={() => handleFilterPress(filterItem.key)}
              />
            ))}
            <div aria-hidden="true" className="w-2 shrink-0" />
          </div>
        </div>
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
                onBookmarkClick={() => handleBookmarkClick(post.postId)}
              >
                <Card
                  href={`/posts/${post.postId}`}
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
        </div>
      </main>
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
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

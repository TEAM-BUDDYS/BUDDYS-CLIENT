'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { FilterSheet } from '@/domains/home/features/filter-sheet/filter-sheet';
import { useFilterSheetValue } from '@/domains/home/hooks/use-filter-sheet-value';
import { useSheetScroll } from '@/domains/home/hooks/use-sheet-scroll';
import {
  buddyFilterItems,
  type BuddyFilterKey,
} from '@/domains/home/model/buddy-filter';
import {
  BUDDY_SEARCH_SIZE,
  getBuddySearchParams,
  hasPostCardFields,
} from '@/domains/home/model/buddy-search';
import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { cn } from '@/lib/cn';
import { ChevronRightIcon } from '@/shared/components/icons';
import {
  AsyncBoundary,
  Card,
  EmptyState,
  Filter,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import type { FilterSheetValue } from '../features/filter-sheet/use-filter-sheet';

interface BuddySearchPostListProps {
  filterValue: FilterSheetValue;
  bookmarkedItemIds: number[];
  onBookmarkClick: (itemId: number) => void;
}

const BuddySearchPostList = ({
  filterValue,
  bookmarkedItemIds,
  onBookmarkClick,
}: BuddySearchPostListProps) => {
  const { data } = useSuspenseQuery(
    POST_QUERY_OPTIONS.LIST(
      getBuddySearchParams(filterValue, BUDDY_SEARCH_SIZE),
    ),
  );

  const posts = (data?.data?.content ?? []).filter(hasPostCardFields);
  const isEmpty = posts.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        title="조건에 맞는 동행 게시물이 없어요"
        description="필터를 바꿔 다른 동행 게시물을 찾아보세요"
        className="py-8"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-6">
      {posts.map((post) => (
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
      ))}
    </div>
  );
};

export const BuddySearchSection = () => {
  const router = useRouter();
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const { filterValue, appliedFilterKeys, handleFilterApply } =
    useFilterSheetValue();
  const { sheetRef, sheetScrollClassName } = useSheetScroll(isFilterSheetOpen);

  const handleMoreClick = () => {
    router.push(ROUTES.CUSTOMIZED_EXPLORE);
  };

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
      <section className="flex flex-col">
        <SectionHeader
          label="맞춤 탐색"
          title="원하는 조건의 동행을 찾아보세요"
          rightSlot={<ChevronRightIcon className="size-6 text-gray-500" />}
          rightSlotLabel="맞춤 탐색 더보기"
          onClick={handleMoreClick}
        />
        <div className="-mx-4 scrollbar-none overflow-x-auto border-b border-gray-100 px-4 py-3">
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
        <AsyncBoundary
          className="py-8"
          resetKeys={[filterValue]}
          loadingFallback={<div className="min-h-96 pt-6" aria-busy="true" />}
        >
          <BuddySearchPostList
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

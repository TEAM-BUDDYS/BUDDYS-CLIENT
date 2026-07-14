'use client';

import { useState } from 'react';

import { SearchSheetButton } from '@/domains/home/components/search-sheet-button/search-sheet-button';
import { FilterSheet } from '@/domains/home/features/filter-sheet/filter-sheet';
import { useFilterSheetValue } from '@/domains/home/hooks/use-filter-sheet-value';
import { useSheetScroll } from '@/domains/home/hooks/use-sheet-scroll';
import {
  buddyFilterItems,
  type BuddyFilterKey,
} from '@/domains/home/model/buddy-filter';
import { cn } from '@/lib/cn';
import { BellIcon } from '@/shared/components/icons';
import { BottomNavigation, Header } from '@/shared/components/layout';
import { AsyncBoundary, Filter } from '@/shared/components/ui';

import { CustomizedExplorePostList } from './customized-explore-post-list';

export const CustomizedExploreContent = () => {
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const { filterValue, appliedFilterKeys, handleFilterApply } =
    useFilterSheetValue();
  const { sheetRef, sheetScrollClassName } = useSheetScroll(isFilterSheetOpen);

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
        <AsyncBoundary
          className="py-20"
          resetKeys={[filterValue]}
          loadingFallback={<div className="min-h-96 py-6" aria-busy="true" />}
        >
          <CustomizedExplorePostList
            filterValue={filterValue}
            bookmarkedItemIds={bookmarkedItemIds}
            onBookmarkClick={handleBookmarkClick}
          />
        </AsyncBoundary>
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

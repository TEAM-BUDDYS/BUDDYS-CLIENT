'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { type KeyboardEvent, useState } from 'react';

import { FilterSheet } from '@/domains/home/features/filter-sheet/filter-sheet';
import { SearchSheet } from '@/domains/home/features/search-sheet/search-sheet';
import { useFilterSheetValue } from '@/domains/home/hooks/use-filter-sheet-value';
import { useSheetScroll } from '@/domains/home/hooks/use-sheet-scroll';
import {
  buddyFilterItems,
  type BuddyFilterKey,
} from '@/domains/home/model/buddy-filter';
import { cn } from '@/lib/cn';
import { BottomNavigation, Header } from '@/shared/components/layout';
import { AsyncBoundary, Filter, Searchbar } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { CustomizedExplorePostList } from './customized-explore-post-list';

export const CustomizedExploreContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookmarkedItemIds, setBookmarkedItemIds] = useState<number[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
  const { filterValue, appliedFilterKeys, handleFilterApply } =
    useFilterSheetValue();
  const {
    sheetRef: filterSheetRef,
    sheetScrollClassName: filterSheetScrollClassName,
  } = useSheetScroll(isFilterSheetOpen);
  const {
    sheetRef: searchSheetRef,
    sheetScrollClassName: searchSheetScrollClassName,
  } = useSheetScroll(isSearchSheetOpen);
  const keyword = searchParams.get('keyword') ?? undefined;
  const searchKeyword = keyword?.trim() ?? '';

  const handleFilterPress = (_filterKey: BuddyFilterKey) => {
    setIsFilterSheetOpen(true);
  };

  const handleFilterSheetClose = () => {
    setIsFilterSheetOpen(false);
  };

  const handleSearchSheetOpen = () => {
    setIsSearchSheetOpen(true);
  };

  const handleSearchSheetClose = () => {
    setIsSearchSheetOpen(false);
  };

  const handleSearchSheetKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      handleSearchSheetClose();
    }
  };

  const handleSearchKeywordClear = () => {
    router.replace(ROUTES.CUSTOMIZED_EXPLORE);
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
        content={
          <Searchbar
            size="small"
            value={searchKeyword}
            readOnly
            onFocus={handleSearchSheetOpen}
            onChange={handleSearchKeywordClear}
          />
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
          resetKeys={[filterValue, keyword]}
          loadingFallback={<div className="min-h-96 py-6" aria-busy="true" />}
        >
          <CustomizedExplorePostList
            filterValue={filterValue}
            keyword={keyword}
            bookmarkedItemIds={bookmarkedItemIds}
            onBookmarkClick={handleBookmarkClick}
          />
        </AsyncBoundary>
      </main>
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
      {isSearchSheetOpen && (
        <div
          ref={searchSheetRef}
          aria-label="검색"
          aria-modal="true"
          className={cn(
            'fixed inset-0 z-50 mx-auto h-dvh max-w-107.5 bg-white',
            searchSheetScrollClassName,
          )}
          onKeyDown={handleSearchSheetKeyDown}
          role="dialog"
        >
          <SearchSheet
            initialKeyword={searchKeyword}
            onClose={handleSearchSheetClose}
          />
        </div>
      )}
      {isFilterSheetOpen && (
        <div
          ref={filterSheetRef}
          className={cn(
            'fixed inset-0 z-50 mx-auto h-dvh max-w-107.5 bg-white',
            filterSheetScrollClassName,
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

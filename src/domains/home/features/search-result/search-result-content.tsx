'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { type KeyboardEvent, useState } from 'react';

import {
  type SearchCategory,
  searchCategoryItems,
} from '@/domains/home/model/search-category';
import { cn } from '@/lib/cn';
import { BottomNavigation, Header } from '@/shared/components/layout';
import { SearchSheet } from '@/shared/components/search/search-sheet';
import {
  AsyncBoundary,
  EmptyState,
  Filter,
  Searchbar,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useSheetScroll } from '@/shared/hooks/use-sheet-scroll';

import { SearchResultBuddyList } from './search-result-buddy-list';
import { SearchResultCourseList } from './search-result-course-list';
import { SearchResultPostList } from './search-result-post-list';

export const SearchResultContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<SearchCategory>('PARTNER');
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
  const {
    sheetRef: searchSheetRef,
    sheetScrollClassName: searchSheetScrollClassName,
  } = useSheetScroll(isSearchSheetOpen);
  const keyword = searchParams.get('keyword') ?? undefined;
  const searchKeyword = keyword?.trim() ?? '';

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
    router.replace(ROUTES.SEARCH);
  };

  return (
    <>
      <Header
        hasBackButton
        content={
          <Searchbar
            size="small"
            aria-label="검색어"
            value={searchKeyword}
            readOnly
            onFocus={handleSearchSheetOpen}
            onChange={handleSearchKeywordClear}
          />
        }
      />
      <main className="px-4 pt-4 pb-19">
        <div className="flex gap-2">
          {searchCategoryItems.map((categoryItem) => (
            <Filter
              key={categoryItem.key}
              label={categoryItem.label}
              pressed={category === categoryItem.key}
              onPress={() => setCategory(categoryItem.key)}
            />
          ))}
        </div>

        <div className="mt-6">
          {searchKeyword ? (
            <AsyncBoundary
              className="py-20"
              resetKeys={[searchKeyword, category]}
              loadingFallback={<div className="min-h-96" aria-busy="true" />}
            >
              {category === 'PARTNER' && (
                <SearchResultPostList keyword={searchKeyword} />
              )}
              {category === 'COURSE' && (
                <SearchResultCourseList keyword={searchKeyword} />
              )}
              {category === 'BUDDY' && (
                <SearchResultBuddyList keyword={searchKeyword} />
              )}
            </AsyncBoundary>
          ) : (
            <EmptyState
              title="검색어를 입력해 주세요"
              description="동행, 코스, 버디를 검색할 수 있어요"
              className="py-20"
            />
          )}
        </div>
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
    </>
  );
};

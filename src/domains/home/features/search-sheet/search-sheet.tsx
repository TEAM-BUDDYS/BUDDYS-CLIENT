'use client';

import type { FormEvent } from 'react';

import { SearchHistory } from '@/domains/home/components/search-history/search-history';
import { useSearchSheet } from '@/domains/home/features/search-sheet/use-search-sheet';
import { Header } from '@/shared/components/layout';
import { FormLabel, Searchbar } from '@/shared/components/ui';

interface SearchSheetProps {
  onClose?: () => void;
  initialKeyword?: string;
}

export const SearchSheet = ({
  onClose,
  initialKeyword = '',
}: SearchSheetProps) => {
  const {
    searchKeyword,
    searchHistoryItems,
    handleSearchKeywordChange,
    handleSearchSubmit,
    handleSearchHistorySelect,
    handleSearchHistoryDelete,
  } = useSearchSheet(onClose, initialKeyword);

  const handleSearchFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearchSubmit();
  };

  return (
    <>
      <Header
        hasBackButton
        onBackClick={onClose}
        content={
          <form className="w-full" onSubmit={handleSearchFormSubmit}>
            <Searchbar
              searchIconClassName="text-gray-200"
              size="small"
              value={searchKeyword}
              autoFocus
              onChange={handleSearchKeywordChange}
            />
          </form>
        }
      />
      <main className="mt-4 flex flex-col px-4">
        <FormLabel as="p" className="text-body-sb-16">
          최근 검색
        </FormLabel>
        <div className="mt-4">
          <SearchHistory
            type="history"
            items={searchHistoryItems}
            onSelect={handleSearchHistorySelect}
            onDelete={handleSearchHistoryDelete}
          />
        </div>
      </main>
    </>
  );
};

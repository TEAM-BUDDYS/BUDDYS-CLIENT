'use client';

import type { FormEvent } from 'react';

import { Header } from '@/shared/components/layout';
import { SearchHistory } from '@/shared/components/search/search-history';
import { FormLabel, Searchbar } from '@/shared/components/ui';
import { useSearchSheet } from '@/shared/hooks/use-search-sheet';

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
          <form className="min-w-0 flex-1" onSubmit={handleSearchFormSubmit}>
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
            items={searchHistoryItems}
            onSelect={handleSearchHistorySelect}
            onDelete={handleSearchHistoryDelete}
          />
        </div>
      </main>
    </>
  );
};

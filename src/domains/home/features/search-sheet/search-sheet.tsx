'use client';

import { SearchHistory } from '@/domains/home/components/search-history/search-history';
import { useSearchSheet } from '@/domains/home/features/search-sheet/use-search-sheet';
import { Header } from '@/shared/components/layout';
import { FormLabel, Searchbar } from '@/shared/components/ui';

interface SearchSheetProps {
  onClose?: () => void;
}

export const SearchSheet = ({ onClose }: SearchSheetProps) => {
  const {
    searchKeyword,
    searchHistoryItems,
    suggestionItems,
    searchHistoryTitle,
    searchHistoryType,
    handleSearchKeywordChange,
    handleSearchHistorySelect,
    handleSearchHistoryDelete,
  } = useSearchSheet();

  return (
    <>
      <Header
        hasBackButton
        onBackClick={onClose}
        content={
          <Searchbar
            size="small"
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
          />
        }
      />
      <main className="mt-4 flex flex-col px-4">
        <FormLabel as="p" className="text-body-sb-16">
          {searchHistoryTitle}
        </FormLabel>
        <div className="mt-4">
          {searchHistoryType === 'history' ? (
            <SearchHistory
              type="history"
              items={searchHistoryItems}
              onSelect={handleSearchHistorySelect}
              onDelete={handleSearchHistoryDelete}
            />
          ) : (
            <SearchHistory
              type="suggestion"
              items={suggestionItems}
              onSelect={handleSearchHistorySelect}
            />
          )}
        </div>
      </main>
    </>
  );
};

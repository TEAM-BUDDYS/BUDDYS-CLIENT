'use client';

import type { FormEvent } from 'react';

import { Header } from '@/shared/components/layout';
import { SearchHistory } from '@/shared/components/search/search-history';
import { SearchSuggestion } from '@/shared/components/search/search-suggestion';
import { AsyncErrorState, FormLabel, Searchbar } from '@/shared/components/ui';
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
    isSuggestionMode,
    suggestionItems,
    isSuggestionsLoading,
    hasSuggestionsError,
    retrySuggestions,
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
        {isSuggestionMode ? (
          isSuggestionsLoading ? (
            <p role="status" className="text-body-m-14 py-4 text-gray-500">
              연관 검색어를 불러오는 중이에요
            </p>
          ) : hasSuggestionsError ? (
            <AsyncErrorState
              className="min-h-60"
              title="연관 검색어를 불러오지 못했어요"
              onRetry={() => void retrySuggestions()}
            />
          ) : suggestionItems.length === 0 ? (
            <p role="status" className="text-body-m-14 py-4 text-gray-500">
              연관 검색어가 없어요
            </p>
          ) : (
            <SearchSuggestion
              items={suggestionItems}
              searchKeyword={searchKeyword}
              onSelect={handleSearchSubmit}
            />
          )
        ) : (
          <>
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
          </>
        )}
      </main>
    </>
  );
};

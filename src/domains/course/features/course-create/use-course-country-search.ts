'use client';

import { useCountrySearch } from '@/shared/api';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { COURSE_CREATE_SEARCH_DEBOUNCE_MS } from './constants';

interface UseCourseCountrySearchParams {
  keyword: string;
  isInputSelected: boolean;
}

export const useCourseCountrySearch = ({
  keyword,
  isInputSelected,
}: UseCourseCountrySearchParams) => {
  const trimmedKeyword = keyword.trim();
  const debouncedKeyword = useDebouncedValue(
    trimmedKeyword,
    COURSE_CREATE_SEARCH_DEBOUNCE_MS,
  );
  const isKeywordSynced = debouncedKeyword === trimmedKeyword;
  const isSearchEnabled =
    !isInputSelected && trimmedKeyword.length > 0 && isKeywordSynced;
  const countrySearch = useCountrySearch({
    keyword: debouncedKeyword,
    enabled: isSearchEnabled,
  });

  return {
    countries: isSearchEnabled ? countrySearch.countries : [],
    isError: isSearchEnabled && countrySearch.isError,
    isSearching:
      !isInputSelected &&
      trimmedKeyword.length > 0 &&
      (!isKeywordSynced || countrySearch.isFetching),
    hasMoreCountries: isSearchEnabled && countrySearch.hasMoreCountries,
    isLoadingMoreCountries: countrySearch.isLoadingMoreCountries,
    loadMoreCountries: countrySearch.loadMoreCountries,
  };
};

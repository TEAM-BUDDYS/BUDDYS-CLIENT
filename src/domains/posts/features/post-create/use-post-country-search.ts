'use client';

import { useCountrySearch } from '@/shared/api';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { POST_CREATE_SEARCH_DEBOUNCE_MS } from './constants';

interface UsePostCountrySearchParams {
  keyword: string;
  enabled?: boolean;
}

export const usePostCountrySearch = ({
  keyword,
  enabled = true,
}: UsePostCountrySearchParams) => {
  const trimmedKeyword = keyword.trim();
  const debouncedKeyword = useDebouncedValue(
    trimmedKeyword,
    POST_CREATE_SEARCH_DEBOUNCE_MS,
  );
  const isKeywordSynced = debouncedKeyword === trimmedKeyword;
  const isSearchEnabled =
    enabled && trimmedKeyword.length > 0 && isKeywordSynced;
  const countrySearch = useCountrySearch({
    keyword: debouncedKeyword,
    enabled: isSearchEnabled,
  });

  return {
    countries: isSearchEnabled ? countrySearch.countries : [],
    isError: isSearchEnabled && countrySearch.isError,
    isSearching:
      enabled &&
      trimmedKeyword.length > 0 &&
      (!isKeywordSynced || countrySearch.isFetching),
    loadMoreCountries: countrySearch.loadMoreCountries,
  };
};

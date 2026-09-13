import { useInfiniteQuery } from '@tanstack/react-query';

import { COUNTRY_QUERY_OPTIONS } from './query';

interface UseCountrySearchParams {
  keyword: string;
  enabled?: boolean;
}

export const useCountrySearch = ({
  keyword,
  enabled = true,
}: UseCountrySearchParams) => {
  const trimmedKeyword = keyword.trim();
  const isSearchEnabled = enabled && trimmedKeyword.length > 0;
  const countrySearchQuery = useInfiniteQuery({
    ...COUNTRY_QUERY_OPTIONS.SEARCH(trimmedKeyword),
    enabled: isSearchEnabled,
  });

  const loadMoreCountries = () => {
    if (
      countrySearchQuery.hasNextPage &&
      !countrySearchQuery.isFetchingNextPage
    ) {
      void countrySearchQuery.fetchNextPage();
    }
  };

  return {
    countries: isSearchEnabled
      ? (countrySearchQuery.data?.pages.flatMap(({ countries }) => countries) ??
        [])
      : [],
    error: countrySearchQuery.error,
    isError: countrySearchQuery.isError,
    isFetching: countrySearchQuery.isFetching,
    hasMoreCountries: countrySearchQuery.hasNextPage,
    isLoadingMoreCountries: countrySearchQuery.isFetchingNextPage,
    loadMoreCountries,
  };
};

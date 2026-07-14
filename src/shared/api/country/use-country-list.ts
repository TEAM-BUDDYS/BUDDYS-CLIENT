import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { COUNTRY_QUERY_OPTIONS } from './query';

export const useCountryList = () => {
  const countriesQuery = useSuspenseInfiniteQuery(COUNTRY_QUERY_OPTIONS.LIST());

  const countryOptions = countriesQuery.data.pages.flatMap(
    (page) => page.countries,
  );

  const loadMoreCountries = () => {
    if (countriesQuery.hasNextPage && !countriesQuery.isFetchingNextPage) {
      void countriesQuery.fetchNextPage();
    }
  };

  return {
    countryOptions,
    hasMoreCountries: countriesQuery.hasNextPage,
    isLoadingMoreCountries: countriesQuery.isFetchingNextPage,
    loadMoreCountries,
  };
};

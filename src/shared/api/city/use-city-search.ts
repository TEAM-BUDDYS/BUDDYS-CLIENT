import { useQuery } from '@tanstack/react-query';

import { CITY_QUERY_OPTIONS } from './query';
import type { City } from './type';
import { getCityDisplayName } from './utils';

interface UseCitySearchParams {
  countryId?: number;
  keyword: string;
  selectedCity?: City | null;
}

export const useCitySearch = ({
  countryId,
  keyword,
  selectedCity,
}: UseCitySearchParams) => {
  const trimmedKeyword = keyword.trim();
  const selectedCityLabel = getCityDisplayName(selectedCity, trimmedKeyword);
  const enabled = Boolean(
    countryId && trimmedKeyword && selectedCityLabel !== trimmedKeyword,
  );

  const citySearchQuery = useQuery({
    ...CITY_QUERY_OPTIONS.SEARCH(countryId ?? 0, trimmedKeyword),
    enabled,
  });

  return {
    cities: citySearchQuery.data ?? [],
    error: citySearchQuery.error,
    isError: citySearchQuery.isError,
    isFetching: citySearchQuery.isFetching,
  };
};

import { useQuery } from '@tanstack/react-query';

import { CITY_QUERY_OPTIONS } from './query';
import type { City } from './type';

interface UseCitySearchParams {
  countryId?: number;
  keyword: string;
  selectedCity?: City | null;
}

const getCityDisplayName = (city?: City | null) => {
  return city?.koreanName ?? city?.name ?? '';
};

export const useCitySearch = ({
  countryId,
  keyword,
  selectedCity,
}: UseCitySearchParams) => {
  const trimmedKeyword = keyword.trim();
  const selectedCityLabel = getCityDisplayName(selectedCity);
  const enabled = Boolean(
    countryId && trimmedKeyword && selectedCityLabel !== keyword,
  );

  const { data = [] } = useQuery({
    ...CITY_QUERY_OPTIONS.SEARCH(countryId ?? 0, trimmedKeyword),
    enabled,
  });

  return data;
};

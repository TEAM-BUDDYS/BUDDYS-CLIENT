import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import { COUNTRY_QUERY_KEY } from '../query-key';
import { createSearchParams } from '../search-params';
import type { City, SearchCitiesParams, SearchCitiesResponse } from './type';

const isCityResponse = (city: unknown): city is City => {
  if (typeof city !== 'object' || city === null) {
    return false;
  }

  const { id, name, koreanName } = city as City;

  return (
    typeof id === 'number' &&
    typeof name === 'string' &&
    (koreanName === undefined || typeof koreanName === 'string')
  );
};

const searchCities = async (countryId: number, params: SearchCitiesParams) => {
  const response = await apiClient
    .get(END_POINT.COUNTRY.CITY_SEARCH(countryId), {
      searchParams: createSearchParams(params),
    })
    .json<SearchCitiesResponse>();

  if (!response.success) {
    throw new Error(response.message || '도시 목록을 불러오지 못했습니다.');
  }

  const cities = response.data?.cities ?? [];

  if (!Array.isArray(cities) || !cities.every(isCityResponse)) {
    throw new Error('도시 목록 응답 형식이 올바르지 않습니다.');
  }

  return cities;
};

const CITY_SEARCH_SIZE = 20;

export const CITY_QUERY_OPTIONS = {
  SEARCH: (countryId: number, keyword: string) =>
    queryOptions({
      queryKey: COUNTRY_QUERY_KEY.CITY_SEARCH(countryId, {
        keyword,
        size: CITY_SEARCH_SIZE,
      }),
      queryFn: () =>
        searchCities(countryId, {
          keyword,
          size: CITY_SEARCH_SIZE,
        }),
    }),
};

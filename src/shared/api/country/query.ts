import { infiniteQueryOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import { COUNTRY_QUERY_KEY } from '../query-key';
import { createSearchParams } from '../search-params';
import type {
  Country,
  CountryPage,
  GetCountriesParams,
  GetCountriesResponse,
  SearchCountriesParams,
  SearchCountriesResponse,
} from './type';

const isCountryResponse = (
  country: unknown,
): country is {
  id: number;
  name: string;
} => {
  if (typeof country !== 'object' || country === null) {
    return false;
  }

  const { id, name } = country as {
    id?: unknown;
    name?: unknown;
  };

  return typeof id === 'number' && typeof name === 'string';
};

const getCountries = async (
  params?: GetCountriesParams,
  signal?: AbortSignal,
): Promise<CountryPage> => {
  const response = await apiClient
    .get(END_POINT.COUNTRY.LIST, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<GetCountriesResponse>();

  if (!response.success) {
    throw new Error(response.message || '국가 목록을 불러오지 못했습니다.');
  }

  const { countries, page, hasNext } = response.data ?? {};

  if (
    !Array.isArray(countries) ||
    typeof page !== 'number' ||
    typeof hasNext !== 'boolean' ||
    !countries.every(isCountryResponse)
  ) {
    throw new Error('국가 목록 응답 형식이 올바르지 않습니다.');
  }

  const countryItems: Country[] = countries.map(({ id, name }) => ({
    id,
    name,
  }));

  return {
    countries: countryItems,
    page,
    hasNext,
  };
};

const searchCountries = async (
  params: SearchCountriesParams,
  signal?: AbortSignal,
): Promise<CountryPage> => {
  const response = await apiClient
    .get(END_POINT.COUNTRY.SEARCH, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<SearchCountriesResponse>();

  if (!response.success) {
    throw new Error(response.message || '국가 목록을 불러오지 못했습니다.');
  }

  const { countries, page, hasNext } = response.data ?? {};

  if (
    !Array.isArray(countries) ||
    typeof page !== 'number' ||
    typeof hasNext !== 'boolean' ||
    !countries.every(isCountryResponse)
  ) {
    throw new Error('국가 목록 응답 형식이 올바르지 않습니다.');
  }

  return {
    countries: countries.map(({ id, name }) => ({ id, name })),
    page,
    hasNext,
  };
};

const COUNTRY_PAGE_SIZE = 50;
const COUNTRY_SEARCH_SIZE = 20;
const REFERENCE_DATA_STALE_TIME = 30 * 60 * 1000;
const REFERENCE_DATA_GC_TIME = 60 * 60 * 1000;

export const COUNTRY_QUERY_OPTIONS = {
  LIST: () =>
    infiniteQueryOptions({
      queryKey: COUNTRY_QUERY_KEY.LIST({
        size: COUNTRY_PAGE_SIZE,
      }),
      queryFn: ({ pageParam, signal }) =>
        getCountries(
          {
            page: pageParam,
            size: COUNTRY_PAGE_SIZE,
          },
          signal,
        ),
      initialPageParam: 0,
      staleTime: REFERENCE_DATA_STALE_TIME,
      gcTime: REFERENCE_DATA_GC_TIME,
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasNext) {
          return undefined;
        }

        return lastPage.page + 1;
      },
    }),
  SEARCH: (keyword: string) =>
    infiniteQueryOptions({
      queryKey: COUNTRY_QUERY_KEY.SEARCH({
        keyword,
        size: COUNTRY_SEARCH_SIZE,
      }),
      queryFn: ({ pageParam, signal }) =>
        searchCountries(
          {
            keyword,
            page: pageParam,
            size: COUNTRY_SEARCH_SIZE,
          },
          signal,
        ),
      initialPageParam: 0,
      staleTime: REFERENCE_DATA_STALE_TIME,
      gcTime: REFERENCE_DATA_GC_TIME,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    }),
};

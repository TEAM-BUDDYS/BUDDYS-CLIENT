import { queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  COUNTRY_QUERY_KEY,
  createSearchParams,
  END_POINT,
  RECOMMENDATION_QUERY_KEY,
} from '@/shared/api';

import type {
  GetCountriesParams,
  GetCountriesResponse,
  GetExchangeCountryRecommendedUsersParams,
  GetExchangeCountryRecommendedUsersResponse,
  GetRecommendedUsersResponse,
  SearchCitiesParams,
  SearchCitiesResponse,
  SearchCountriesParams,
  SearchCountriesResponse,
} from './type';

const getRecommendedUsers = async () => {
  return apiClient
    .get(END_POINT.RECOMMENDATION.USERS)
    .json<GetRecommendedUsersResponse>();
};

const getExchangeCountryRecommendedUsers = async (
  params?: GetExchangeCountryRecommendedUsersParams,
) => {
  return apiClient
    .get(END_POINT.RECOMMENDATION.USERS_BY_EXCHANGE_COUNTRY, {
      searchParams: createSearchParams(params),
    })
    .json<GetExchangeCountryRecommendedUsersResponse>();
};

const getCountries = async (params?: GetCountriesParams) => {
  return apiClient
    .get(END_POINT.COUNTRY.LIST, {
      searchParams: createSearchParams(params),
    })
    .json<GetCountriesResponse>();
};

const searchCountries = async (params: SearchCountriesParams) => {
  return apiClient
    .get(END_POINT.COUNTRY.SEARCH, {
      searchParams: createSearchParams(params),
    })
    .json<SearchCountriesResponse>();
};

const searchCities = async (countryId: number, params: SearchCitiesParams) => {
  return apiClient
    .get(END_POINT.COUNTRY.CITY_SEARCH(countryId), {
      searchParams: createSearchParams(params),
    })
    .json<SearchCitiesResponse>();
};

export const HOME_QUERY_OPTIONS = {
  RECOMMENDED_USERS: () =>
    queryOptions({
      queryKey: RECOMMENDATION_QUERY_KEY.USERS(),
      queryFn: getRecommendedUsers,
    }),
  EXCHANGE_COUNTRY_RECOMMENDED_USERS: (
    params?: GetExchangeCountryRecommendedUsersParams,
  ) =>
    queryOptions({
      queryKey: RECOMMENDATION_QUERY_KEY.USERS_BY_EXCHANGE_COUNTRY(params),
      queryFn: () => getExchangeCountryRecommendedUsers(params),
    }),
  COUNTRIES: (params?: GetCountriesParams) =>
    queryOptions({
      queryKey: COUNTRY_QUERY_KEY.LIST(params),
      queryFn: () => getCountries(params),
    }),
  SEARCH_COUNTRIES: (params: SearchCountriesParams) =>
    queryOptions({
      queryKey: COUNTRY_QUERY_KEY.SEARCH(params),
      queryFn: () => searchCountries(params),
    }),
  SEARCH_CITIES: (countryId: number, params: SearchCitiesParams) =>
    queryOptions({
      queryKey: COUNTRY_QUERY_KEY.CITY_SEARCH(countryId, params),
      queryFn: () => searchCities(countryId, params),
    }),
};

import type { components, operations } from '@/types/schema';

export type GetRecommendedUsersResponse =
  components['schemas']['BaseResponseRecommendedUserListResponse'];

export type GetExchangeCountryRecommendedUsersParams =
  operations['getExchangeCountryRecommendedUsers']['parameters']['query'];
export type GetExchangeCountryRecommendedUsersResponse =
  components['schemas']['BaseResponseExchangeCountryRecommendedUserListResponse'];

export type GetCountriesParams =
  operations['getCountries']['parameters']['query'];
export type GetCountriesResponse =
  components['schemas']['BaseResponseCountryListResponse'];

export type SearchCountriesParams =
  operations['searchCountries']['parameters']['query'];
export type SearchCountriesResponse =
  components['schemas']['BaseResponseCountryListResponse'];

export type SearchCitiesParams =
  operations['searchCities']['parameters']['query'];
export type SearchCitiesResponse =
  components['schemas']['BaseResponseCityListResponse'];

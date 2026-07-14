import type { components, operations } from '@/types/schema';

export type GetRecommendedUsersResponse =
  components['schemas']['BaseResponseRecommendedUserListResponse'];

export type GetExchangeCountryRecommendedUsersParams =
  operations['getExchangeCountryRecommendedUsers']['parameters']['query'];
export type GetExchangeCountryRecommendedUsersResponse =
  components['schemas']['BaseResponseExchangeCountryRecommendedUserListResponse'];
export type ExchangeCountryRecommendedUser =
  components['schemas']['ExchangeCountryRecommendedUserResponse'];

export type SearchCountriesParams =
  operations['searchCountries']['parameters']['query'];
export type SearchCountriesResponse =
  components['schemas']['BaseResponseCountryListResponse'];

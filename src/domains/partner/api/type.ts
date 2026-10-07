import type { components, operations } from '@/types/schema';

export type GetExchangeCountryRecommendedUsersParams =
  operations['getExchangeCountryRecommendedUsers']['parameters']['query'];
export type GetExchangeCountryRecommendedUsersResponse =
  components['schemas']['BaseResponseExchangeCountryRecommendedUserListResponse'];
export type ExchangeCountryRecommendedUser =
  components['schemas']['ExchangeCountryRecommendedUserResponse'];

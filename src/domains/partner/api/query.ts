import { queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  RECOMMENDATION_QUERY_KEY,
} from '@/shared/api';

import type {
  GetExchangeCountryRecommendedUsersParams,
  GetExchangeCountryRecommendedUsersResponse,
} from './type';

const getExchangeCountryRecommendedUsers = async (
  params?: GetExchangeCountryRecommendedUsersParams,
) => {
  return apiClient
    .get(END_POINT.RECOMMENDATION.USERS_BY_EXCHANGE_COUNTRY, {
      searchParams: createSearchParams(params),
    })
    .json<GetExchangeCountryRecommendedUsersResponse>();
};

export const HOME_QUERY_OPTIONS = {
  EXCHANGE_COUNTRY_RECOMMENDED_USERS: (
    params?: GetExchangeCountryRecommendedUsersParams,
  ) =>
    queryOptions({
      queryKey: RECOMMENDATION_QUERY_KEY.USERS_BY_EXCHANGE_COUNTRY(params),
      queryFn: () => getExchangeCountryRecommendedUsers(params),
    }),
};

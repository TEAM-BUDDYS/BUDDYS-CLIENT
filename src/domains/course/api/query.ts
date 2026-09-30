import { infiniteQueryOptions } from '@tanstack/react-query';

import {
  AIRLINE_QUERY_KEY,
  apiClient,
  createSearchParams,
  END_POINT,
} from '@/shared/api';

import type { SearchAirlinesParams, SearchAirlinesResponse } from './type';

const searchAirlines = async (
  params: SearchAirlinesParams,
  signal?: AbortSignal,
) => {
  const response = await apiClient
    .get(END_POINT.AIRLINE.SEARCH, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<SearchAirlinesResponse>();

  if (!response.success || !response.data) {
    throw new Error(response.message || '항공사를 불러오지 못했습니다.');
  }

  return response.data;
};

export const AIRLINE_QUERY_OPTIONS = {
  SEARCH: (params: SearchAirlinesParams) =>
    infiniteQueryOptions({
      queryKey: AIRLINE_QUERY_KEY.SEARCH(params),
      queryFn: ({ pageParam, signal }) =>
        searchAirlines({ ...params, page: pageParam }, signal),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    }),
};

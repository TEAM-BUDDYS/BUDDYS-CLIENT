import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  MAGAZINE_QUERY_KEY,
} from '@/shared/api';

import type { GetMagazinesParams, GetMagazinesResponse } from './type';

const getMagazines = async (params: GetMagazinesParams) => {
  return apiClient
    .get(END_POINT.MAGAZINE.LIST, {
      searchParams: createSearchParams(params),
    })
    .json<GetMagazinesResponse>();
};

export const HOME_QUERY_OPTIONS = {
  MAGAZINES: (params: GetMagazinesParams) =>
    queryOptions({
      queryKey: MAGAZINE_QUERY_KEY.LIST(params),
      queryFn: () => getMagazines(params),
    }),

  MAGAZINES_INFINITE: (params: GetMagazinesParams) =>
    infiniteQueryOptions({
      queryKey: MAGAZINE_QUERY_KEY.INFINITE_LIST(params),
      queryFn: ({ pageParam }) =>
        getMagazines({
          ...params,
          page: pageParam,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.data.hasNext) {
          return undefined;
        }

        return lastPage.data.page + 1;
      },
    }),
};

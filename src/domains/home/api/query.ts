import { infiniteQueryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  SEARCH_QUERY_KEY,
} from '@/shared/api';

import type {
  GetSearchResponse,
  SearchInfiniteParams,
  SearchParams,
  SearchResult,
  SearchType,
} from './type';

const SEARCH_RESULT_KEY_BY_TYPE = {
  POST: 'posts',
  COURSE: 'courses',
  USER: 'users',
} as const satisfies Record<SearchType, keyof SearchResult>;

const getSearch = async (params: SearchParams) => {
  const response = await apiClient
    .get(END_POINT.SEARCH.INTEGRATED, {
      searchParams: createSearchParams(params),
    })
    .json<GetSearchResponse>();

  if (response.success === false) {
    throw new Error(response.message || '검색 결과를 불러오지 못했습니다.');
  }

  return response;
};

export const SEARCH_QUERY_OPTIONS = {
  INFINITE: (params: SearchInfiniteParams) =>
    infiniteQueryOptions({
      queryKey: SEARCH_QUERY_KEY.INFINITE(params),
      queryFn: ({ pageParam }) => getSearch({ ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const section = lastPage.data?.[SEARCH_RESULT_KEY_BY_TYPE[params.type]];
        const page = section?.page;

        if (!section?.hasNext || typeof page !== 'number') {
          return undefined;
        }

        return page + 1;
      },
    }),
};

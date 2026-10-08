import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  MAGAZINE_QUERY_KEY,
  SEARCH_QUERY_KEY,
} from '@/shared/api';

import type {
  GetMagazinesParams,
  GetMagazinesResponse,
  GetSearchResponse,
  SearchInfiniteParams,
  SearchParams,
  SearchResult,
  SearchType,
  UpdateMagazineBookmarkResponse,
} from './type';

interface UpdateMagazineBookmarkVariables {
  magazineId: number;
  isBookmarked: boolean;
}

const updateMagazineBookmark = async ({
  magazineId,
  isBookmarked,
}: UpdateMagazineBookmarkVariables) => {
  const endpoint = END_POINT.MAGAZINE.BOOKMARK(magazineId);
  const response = await (
    isBookmarked ? apiClient.post(endpoint) : apiClient.delete(endpoint)
  ).json<UpdateMagazineBookmarkResponse>();

  if (
    response.success !== true ||
    response.data?.magazineId !== magazineId ||
    response.data.isBookmarked !== isBookmarked
  ) {
    throw new Error(response.message || '매거진 북마크를 변경하지 못했습니다.');
  }

  return response.data;
};

export const HOME_MUTATION_OPTIONS = {
  UPDATE_MAGAZINE_BOOKMARK: () =>
    mutationOptions({ mutationFn: updateMagazineBookmark }),
};

const SEARCH_RESULT_KEY_BY_TYPE = {
  POST: 'posts',
  COURSE: 'courses',
  USER: 'users',
} as const satisfies Record<SearchType, keyof SearchResult>;

const getMagazines = async (params: GetMagazinesParams) => {
  return apiClient
    .get(END_POINT.MAGAZINE.LIST, {
      searchParams: createSearchParams(params),
    })
    .json<GetMagazinesResponse>();
};

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

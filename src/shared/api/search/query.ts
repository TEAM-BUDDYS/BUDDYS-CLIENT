import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import { SEARCH_QUERY_KEY } from '../query-key';
import { createSearchParams } from '../search-params';
import type {
  GetSearchSuggestionsParams,
  GetSearchSuggestionsResponse,
} from './type';

const getSearchSuggestions = async (
  params: GetSearchSuggestionsParams,
  signal?: AbortSignal,
) => {
  const response = await apiClient
    .get(END_POINT.SEARCH.SUGGESTIONS, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<GetSearchSuggestionsResponse>();

  if (
    response.success !== true ||
    !Array.isArray(response.data?.suggestions) ||
    !response.data.suggestions.every(
      (suggestion) => typeof suggestion?.keyword === 'string',
    )
  ) {
    throw new Error(response.message || '연관 검색어를 불러오지 못했습니다.');
  }

  return response.data.suggestions;
};

export const SEARCH_QUERY_OPTIONS = {
  SUGGESTIONS: (params: GetSearchSuggestionsParams) =>
    queryOptions({
      queryKey: SEARCH_QUERY_KEY.SUGGESTIONS(params),
      queryFn: ({ signal }) => getSearchSuggestions(params, signal),
      enabled: Boolean(params.keyword.trim()),
    }),
};

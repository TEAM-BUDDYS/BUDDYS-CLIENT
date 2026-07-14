import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import { RECOMMENDATION_QUERY_KEY } from '../query-key';
import { createSearchParams } from '../search-params';
import type {
  GetRecommendedPostsParams,
  GetRecommendedPostsResponse,
} from './type';

const getRecommendedPosts = async (params?: GetRecommendedPostsParams) => {
  return apiClient
    .get(END_POINT.RECOMMENDATION.POSTS, {
      searchParams: createSearchParams(params),
    })
    .json<GetRecommendedPostsResponse>();
};

export const RECOMMENDATION_QUERY_OPTIONS = {
  RECOMMENDED_POSTS: (params?: GetRecommendedPostsParams) =>
    queryOptions({
      queryKey: RECOMMENDATION_QUERY_KEY.POSTS(params),
      queryFn: () => getRecommendedPosts(params),
    }),
};

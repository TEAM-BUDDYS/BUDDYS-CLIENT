import type { components, operations } from '@/types/schema';

export type GetRecommendedPostsParams =
  operations['getRecommendedPosts']['parameters']['query'];

export type GetRecommendedPostsResponse =
  components['schemas']['BaseResponseRecommendedPostListResponse'];

export type RecommendedPost = components['schemas']['RecommendedPostResponse'];

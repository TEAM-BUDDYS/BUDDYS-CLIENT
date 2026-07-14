import type { components, operations } from '@/types/schema';

export type GetMyProfileResponse =
  components['schemas']['BaseResponseUserProfileResponse'];

export type GetMyPostsParams = operations['getMyPosts']['parameters']['query'];
export type GetMyPostsResponse =
  components['schemas']['BaseResponseUserPostsResponse'];

export type GetUserProfileResponse =
  components['schemas']['BaseResponseUserPublicProfileResponse'];

export type GetUserPostsParams =
  operations['getUserPosts']['parameters']['query'];
export type GetUserPostsResponse =
  components['schemas']['BaseResponseUserPostsResponse'];

export type UserPost = components['schemas']['PostResponse'];

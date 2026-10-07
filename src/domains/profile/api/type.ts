import type { components, operations } from '@/types/schema';

export type GetMyProfileResponse =
  components['schemas']['BaseResponseUserProfileResponse'];

export type GetMyPostsParams = operations['getMyPosts']['parameters']['query'];
export type GetMyPostsResponse =
  components['schemas']['BaseResponseUserPostsResponse'];

export type MyPost = components['schemas']['PostResponse'];

export type GetUserProfileResponse =
  components['schemas']['BaseResponseUserPublicProfileResponse'];

export type GetUserPostsParams =
  operations['getUserPosts']['parameters']['query'];
export type GetUserPostsResponse =
  components['schemas']['BaseResponseUserPostsResponse'];

export type UserPost = components['schemas']['PostResponse'];

export type GetBookmarkedPostsParams =
  operations['getBookmarkedPosts']['parameters']['query'];
export type GetBookmarkedPostsResponse =
  components['schemas']['BaseResponsePostListResponse'];

export type GetBookmarkedCoursesParams =
  operations['getBookmarkedCourses']['parameters']['query'];
export type GetBookmarkedCoursesResponse =
  components['schemas']['BaseResponseCourseListResponse'];

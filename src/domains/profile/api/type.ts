import type { components, operations } from '@/types/schema';

export type GetMyProfileResponse =
  components['schemas']['BaseResponseUserProfileResponse'];

export type GetMyCountriesResponse = components['schemas']['BaseResponse'];

export interface MyCountry {
  id: number;
  name: string;
  englishName: string;
  code: string;
}

export interface MyCountries {
  interestCountry: MyCountry | null;
  exchangeCountry: MyCountry | null;
}

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

export type GetBookmarkedMagazinesParams =
  operations['getBookmarkedMagazines']['parameters']['query'];
export type GetBookmarkedMagazinesResponse =
  components['schemas']['BaseResponseBookmarkedMagazineListResponse'];

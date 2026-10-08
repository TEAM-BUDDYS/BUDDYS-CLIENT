import type { components, operations } from '@/types/schema';

export type GetMyProfileResponse =
  components['schemas']['BaseResponseUserProfileResponse'];

export type UpdateMyProfileRequest =
  components['schemas']['UpdateProfileRequest'];

export type UpdateMyProfileResponse = components['schemas']['BaseResponse'];

export type MyProfileForEdit = Omit<UpdateMyProfileRequest, 'orderedTagIds'> & {
  orderedTags: components['schemas']['OrderedTagResponse'][];
};

export type GetMyProfileForEditResponse = Omit<
  components['schemas']['BaseResponse'],
  'data'
> & {
  data?: MyProfileForEdit;
};

export type GetMyPostsParams = operations['getMyPosts']['parameters']['query'];
export type GetMyPostsResponse =
  components['schemas']['BaseResponseUserPostsResponse'];

export type MyPost = components['schemas']['PostResponse'];

export type GetMyCoursesParams =
  operations['getMyCourses']['parameters']['query'];
export type GetMyCoursesResponse =
  components['schemas']['BaseResponseUserCoursesResponse'];

export type MyCourse = components['schemas']['CourseResponse'];

export type GetUserProfileResponse =
  components['schemas']['BaseResponseUserPublicProfileResponse'];

export type GetUserPostsParams =
  operations['getUserPosts']['parameters']['query'];
export type GetUserPostsResponse =
  components['schemas']['BaseResponseUserPostsResponse'];

export type UserPost = components['schemas']['PostResponse'];

export type GetUserCoursesParams =
  operations['getUserCourses']['parameters']['query'];
export type GetUserCoursesResponse =
  components['schemas']['BaseResponseUserCoursesResponse'];

export type UserCourse = components['schemas']['CourseResponse'];

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

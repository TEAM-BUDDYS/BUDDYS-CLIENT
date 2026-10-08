import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import {
  apiClient,
  COURSE_QUERY_KEY,
  createSearchParams,
  END_POINT,
  MAGAZINE_QUERY_KEY,
  POST_QUERY_KEY,
  USER_QUERY_KEY,
} from '@/shared/api';

import type { MyProfile } from '../model/profile';
import type {
  GetBookmarkedCoursesParams,
  GetBookmarkedCoursesResponse,
  GetBookmarkedMagazinesParams,
  GetBookmarkedMagazinesResponse,
  GetBookmarkedPostsParams,
  GetBookmarkedPostsResponse,
  GetMyCoursesParams,
  GetMyCoursesResponse,
  GetMyPostsParams,
  GetMyPostsResponse,
  GetMyProfileForEditResponse,
  GetMyProfileResponse,
  GetUserCoursesParams,
  GetUserCoursesResponse,
  GetUserPostsParams,
  GetUserPostsResponse,
  UpdateMyProfileRequest,
  UpdateMyProfileResponse,
} from './type';

interface OrderedTag {
  id: number;
  name: string;
}

const toProfileTags = (tags: OrderedTag[] | undefined) => {
  return (tags ?? []).map(({ id, name }) => ({
    id,
    name,
  }));
};

type UserProfileData = NonNullable<GetMyProfileResponse['data']>;
type UserProfileDataWithNickname = UserProfileData & { nickname: string };

const hasValidNickname = (
  data: unknown,
): data is UserProfileDataWithNickname => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const { nickname } = data as Partial<UserProfileData>;

  return typeof nickname === 'string';
};

const isNullableString = (value: unknown) => {
  return value === undefined || value === null || typeof value === 'string';
};

type UserCoursesData = NonNullable<GetMyCoursesResponse['data']>;

const isValidCourse = (course: unknown) => {
  if (typeof course !== 'object' || course === null) {
    return false;
  }

  const { courseId, thumbnailImageUrl } = course as Partial<
    UserCoursesData['courses'][number]
  >;

  return typeof courseId === 'number' && isNullableString(thumbnailImageUrl);
};

const isValidUserCoursesData = (data: unknown): data is UserCoursesData => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const { courses, page, hasNext } = data as Partial<UserCoursesData>;

  return (
    Array.isArray(courses) &&
    courses.every(isValidCourse) &&
    typeof page === 'number' &&
    typeof hasNext === 'boolean'
  );
};

const getMyProfile = async (): Promise<MyProfile> => {
  const response = await apiClient
    .get(END_POINT.USER.ME)
    .json<GetMyProfileResponse>();

  if (response.success === false) {
    throw new Error(response.message || '프로필을 불러오지 못했습니다.');
  }

  if (!hasValidNickname(response.data)) {
    throw new Error('프로필 응답 형식이 올바르지 않습니다.');
  }

  const {
    profileImageUrl,
    nickname,
    universityEmailVerified,
    exchangeDocumentVerified,
    orderedTags,
    bio,
  } = response.data;

  return {
    imageUrl: profileImageUrl || null,
    nickname,
    isVerified: universityEmailVerified || exchangeDocumentVerified,
    isUniversityEmailVerified: universityEmailVerified,
    isExchangeDocumentVerified: exchangeDocumentVerified,
    tags: toProfileTags(orderedTags),
    bio: bio ?? null,
  };
};

const getMyProfileForEdit = async (): Promise<GetMyProfileForEditResponse> => {
  const response = await apiClient
    .get(END_POINT.USER.ME_EDIT)
    .json<GetMyProfileForEditResponse>();

  if (response.success === false) {
    throw new Error(
      response.message || '프로필 편집 정보를 불러오지 못했습니다.',
    );
  }

  return response;
};

const getMyPosts = async (
  params?: GetMyPostsParams,
): Promise<GetMyPostsResponse> => {
  const response = await apiClient
    .get(END_POINT.USER.ME_POSTS, {
      searchParams: createSearchParams(params),
    })
    .json<GetMyPostsResponse>();

  if (response.success === false) {
    throw new Error(response.message || '게시글을 불러오지 못했습니다.');
  }

  return response;
};

const getMyCourses = async (
  params?: GetMyCoursesParams,
): Promise<GetMyCoursesResponse> => {
  const response = await apiClient
    .get(END_POINT.USER.ME_COURSES, {
      searchParams: createSearchParams(params),
    })
    .json<GetMyCoursesResponse>();

  if (response.success === false) {
    throw new Error(response.message || '코스를 불러오지 못했습니다.');
  }

  if (!isValidUserCoursesData(response.data)) {
    throw new Error('코스 응답 형식이 올바르지 않습니다.');
  }

  return response;
};

const getUserPosts = async (userId: number, params?: GetUserPostsParams) => {
  return apiClient
    .get(END_POINT.USER.POSTS(userId), {
      searchParams: createSearchParams(params),
    })
    .json<GetUserPostsResponse>();
};

const getUserCourses = async (
  userId: number,
  params?: GetUserCoursesParams,
): Promise<GetUserCoursesResponse> => {
  const response = await apiClient
    .get(END_POINT.USER.COURSES(userId), {
      searchParams: createSearchParams(params),
    })
    .json<GetUserCoursesResponse>();

  if (response.success === false) {
    throw new Error(response.message || '코스를 불러오지 못했습니다.');
  }

  if (!isValidUserCoursesData(response.data)) {
    throw new Error('코스 응답 형식이 올바르지 않습니다.');
  }

  return response;
};

export const requestWithdraw = async () => {
  await apiClient.delete(END_POINT.USER.ME);
};

const getBookmarkedPosts = async (params?: GetBookmarkedPostsParams) => {
  const response = await apiClient
    .get(END_POINT.POST.BOOKMARKS, {
      searchParams: createSearchParams(params),
    })
    .json<GetBookmarkedPostsResponse>();

  if (response.success === false) {
    throw new Error(
      response.message || '저장한 동행 목록을 불러오지 못했습니다.',
    );
  }

  return response;
};

const updateMyProfile = async (body: UpdateMyProfileRequest) => {
  const response = await apiClient
    .put(END_POINT.USER.ME, { json: body })
    .json<UpdateMyProfileResponse>();

  if (response.success === false) {
    throw new Error(response.message || '프로필을 수정하지 못했습니다.');
  }

  return response;
};

const getBookmarkedCourses = async (params?: GetBookmarkedCoursesParams) => {
  const response = await apiClient
    .get(END_POINT.COURSE.BOOKMARKS, {
      searchParams: createSearchParams(params),
    })
    .json<GetBookmarkedCoursesResponse>();

  if (response.success === false) {
    throw new Error(
      response.message || '저장한 코스 목록을 불러오지 못했습니다.',
    );
  }

  return response;
};

const getBookmarkedMagazines = async (
  params?: GetBookmarkedMagazinesParams,
) => {
  const response = await apiClient
    .get(END_POINT.MAGAZINE.BOOKMARKS, {
      searchParams: createSearchParams(params),
    })
    .json<GetBookmarkedMagazinesResponse>();

  if (response.success === false) {
    throw new Error(
      response.message || '저장한 매거진 목록을 불러오지 못했습니다.',
    );
  }

  return response;
};

export const PROFILE_MUTATION_OPTIONS = {
  UPDATE: () =>
    mutationOptions({
      mutationFn: (body: UpdateMyProfileRequest) => updateMyProfile(body),
    }),
};

export const PROFILE_QUERY_OPTIONS = {
  ME_EDIT: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.ME_EDIT(),
      queryFn: getMyProfileForEdit,
    }),
  ME: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.ME(),
      queryFn: getMyProfile,
    }),
  ME_POSTS: (params?: GetMyPostsParams) =>
    queryOptions({
      queryKey: USER_QUERY_KEY.ME_POSTS(params),
      queryFn: () => getMyPosts(params),
    }),
  ME_POSTS_INFINITE: (params?: GetMyPostsParams) =>
    infiniteQueryOptions({
      queryKey: USER_QUERY_KEY.ME_POSTS_INFINITE(params),
      queryFn: ({ pageParam }) => getMyPosts({ ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.data?.hasNext) {
          return undefined;
        }

        return (lastPage.data.page ?? 0) + 1;
      },
    }),
  ME_COURSES_INFINITE: (params?: GetMyCoursesParams) =>
    infiniteQueryOptions({
      queryKey: USER_QUERY_KEY.ME_COURSES_INFINITE(params),
      queryFn: ({ pageParam }) => getMyCourses({ ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const page = lastPage.data?.page;

        if (!lastPage.data?.hasNext || typeof page !== 'number') {
          return undefined;
        }

        return page + 1;
      },
    }),
  USER_POSTS: (userId: number, params?: GetUserPostsParams) =>
    queryOptions({
      queryKey: USER_QUERY_KEY.POSTS(userId, params),
      queryFn: () => getUserPosts(userId, params),
    }),
  USER_POSTS_INFINITE: (userId: number, params?: GetUserPostsParams) =>
    infiniteQueryOptions({
      queryKey: USER_QUERY_KEY.POSTS_INFINITE(userId, params),
      queryFn: ({ pageParam }) =>
        getUserPosts(userId, { ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const page = lastPage.data?.page;

        if (!lastPage.data?.hasNext || typeof page !== 'number') {
          return undefined;
        }

        return page + 1;
      },
    }),
  USER_COURSES_INFINITE: (userId: number, params?: GetUserCoursesParams) =>
    infiniteQueryOptions({
      queryKey: USER_QUERY_KEY.COURSES_INFINITE(userId, params),
      queryFn: ({ pageParam }) =>
        getUserCourses(userId, { ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const page = lastPage.data?.page;

        if (!lastPage.data?.hasNext || typeof page !== 'number') {
          return undefined;
        }

        return page + 1;
      },
    }),
  BOOKMARKED_POSTS_INFINITE: (params?: GetBookmarkedPostsParams) =>
    infiniteQueryOptions({
      queryKey: POST_QUERY_KEY.BOOKMARKS_INFINITE(params),
      queryFn: ({ pageParam }) =>
        getBookmarkedPosts({ ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const page = lastPage.data?.page;

        if (!lastPage.data?.hasNext || typeof page !== 'number') {
          return undefined;
        }

        return page + 1;
      },
    }),
  BOOKMARKED_COURSES_INFINITE: (params?: GetBookmarkedCoursesParams) =>
    infiniteQueryOptions({
      queryKey: COURSE_QUERY_KEY.BOOKMARKS_INFINITE(params),
      queryFn: ({ pageParam }) =>
        getBookmarkedCourses({ ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const page = lastPage.data?.page;

        if (!lastPage.data?.hasNext || typeof page !== 'number') {
          return undefined;
        }

        return page + 1;
      },
    }),
  BOOKMARKED_MAGAZINES_INFINITE: (params?: GetBookmarkedMagazinesParams) =>
    infiniteQueryOptions({
      queryKey: MAGAZINE_QUERY_KEY.BOOKMARKS_INFINITE(params),
      queryFn: ({ pageParam }) =>
        getBookmarkedMagazines({ ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const page = lastPage.data?.page;

        if (!lastPage.data?.hasNext || typeof page !== 'number') {
          return undefined;
        }

        return page + 1;
      },
    }),
};

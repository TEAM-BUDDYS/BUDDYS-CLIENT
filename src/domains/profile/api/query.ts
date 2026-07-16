import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { isHTTPError } from 'ky';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  USER_QUERY_KEY,
} from '@/shared/api';

import type { MyProfile, OtherProfile } from '../model/profile';
import type {
  GetMyPostsParams,
  GetMyPostsResponse,
  GetMyProfileResponse,
  GetUserPostsParams,
  GetUserPostsResponse,
  GetUserProfileResponse,
  TagGroup,
} from './type';

const toOrderedTags = (
  representativeTags: string[] | undefined,
  allTags: TagGroup[] | undefined,
) => {
  const representativeNames = representativeTags ?? [];
  const otherNames = (allTags ?? [])
    .flatMap((group) => group.tags ?? [])
    .filter((name) => !representativeNames.includes(name));

  return [...representativeNames, ...otherNames].map((name, index) => ({
    id: index,
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

type UserPublicProfileData = NonNullable<GetUserProfileResponse['data']>;
type UserPublicProfileDataWithNickname = UserPublicProfileData & {
  nickname: string;
};

const isValidUserPublicProfileData = (
  data: unknown,
): data is UserPublicProfileDataWithNickname => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const {
    nickname,
    profileImageUrl,
    verificationBadge,
    representativeTags,
    allTags,
    bio,
    isDeleted,
  } = data as Partial<UserPublicProfileData>;

  return (
    typeof nickname === 'string' &&
    (profileImageUrl === undefined || typeof profileImageUrl === 'string') &&
    (verificationBadge === undefined ||
      typeof verificationBadge === 'string') &&
    (representativeTags === undefined || Array.isArray(representativeTags)) &&
    (allTags === undefined || Array.isArray(allTags)) &&
    (bio === undefined || typeof bio === 'string') &&
    (isDeleted === undefined || typeof isDeleted === 'boolean')
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
    verificationBadge,
    representativeTags,
    allTags,
    bio,
  } = response.data;

  return {
    imageUrl: profileImageUrl || null,
    nickname,
    isVerified: Boolean(verificationBadge),
    tags: toOrderedTags(representativeTags, allTags),
    bio: bio ?? null,
  };
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

const getUserProfile = async (userId: number): Promise<OtherProfile | null> => {
  let response: GetUserProfileResponse;

  try {
    response = await apiClient
      .get(END_POINT.USER.PROFILE(userId))
      .json<GetUserProfileResponse>();
  } catch (error) {
    if (isHTTPError(error) && error.response.status === 404) {
      return null;
    }

    throw error;
  }

  if (response.success === false) {
    throw new Error(response.message || '프로필을 불러오지 못했습니다.');
  }

  if (!isValidUserPublicProfileData(response.data)) {
    throw new Error('프로필 응답 형식이 올바르지 않습니다.');
  }

  const {
    profileImageUrl,
    nickname,
    verificationBadge,
    representativeTags,
    allTags,
    bio,
    isDeleted,
  } = response.data;

  return {
    imageUrl: profileImageUrl || null,
    nickname,
    isVerified: Boolean(verificationBadge),
    tags: toOrderedTags(representativeTags, allTags),
    bio: bio ?? null,
    isWithdrawn: Boolean(isDeleted),
  };
};

const getUserPosts = async (userId: number, params?: GetUserPostsParams) => {
  return apiClient
    .get(END_POINT.USER.POSTS(userId), {
      searchParams: createSearchParams(params),
    })
    .json<GetUserPostsResponse>();
};

export const PROFILE_QUERY_OPTIONS = {
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
  USER_PROFILE: (userId: number) =>
    queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(userId),
      queryFn: () => getUserProfile(userId),
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
};

import { queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  USER_QUERY_KEY,
} from '@/shared/api';

import type { MyProfile } from '../model/profile';
import type {
  GetMyPostsParams,
  GetMyPostsResponse,
  GetMyProfileResponse,
  GetUserPostsParams,
  GetUserPostsResponse,
  GetUserProfileResponse,
} from './type';

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
    bio,
  } = response.data;

  return {
    imageUrl: profileImageUrl || null,
    nickname,
    isVerified: Boolean(verificationBadge),
    tags: (representativeTags ?? []).map((name, index) => ({
      id: index,
      name,
    })),
    bio: bio ?? null,
    posts: [], // TODO: getMyPosts 연동 후 채우기
  };
};

const getMyPosts = async (params?: GetMyPostsParams) => {
  return apiClient
    .get(END_POINT.USER.ME_POSTS, {
      searchParams: createSearchParams(params),
    })
    .json<GetMyPostsResponse>();
};

const getUserProfile = async (userId: number) => {
  return apiClient
    .get(END_POINT.USER.PROFILE(userId))
    .json<GetUserProfileResponse>();
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
};

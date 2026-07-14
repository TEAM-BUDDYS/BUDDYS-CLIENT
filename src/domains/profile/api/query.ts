import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  USER_QUERY_KEY,
} from '@/shared/api';

import type { OtherProfile } from '../model/profile';
import type {
  GetMyPostsParams,
  GetMyPostsResponse,
  GetMyProfileResponse,
  GetUserPostsParams,
  GetUserPostsResponse,
  GetUserProfileResponse,
} from './type';

type UserPublicProfileData = NonNullable<GetUserProfileResponse['data']>;
type UserPublicProfileDataWithNickname = UserPublicProfileData & {
  nickname: string;
};

const hasValidPublicNickname = (
  data: unknown,
): data is UserPublicProfileDataWithNickname => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const { nickname } = data as Partial<UserPublicProfileData>;

  return typeof nickname === 'string';
};

const getMyProfile = async () => {
  return apiClient.get(END_POINT.USER.ME).json<GetMyProfileResponse>();
};

const getMyPosts = async (params?: GetMyPostsParams) => {
  return apiClient
    .get(END_POINT.USER.ME_POSTS, {
      searchParams: createSearchParams(params),
    })
    .json<GetMyPostsResponse>();
};

const getUserProfile = async (userId: number): Promise<OtherProfile> => {
  const response = await apiClient
    .get(END_POINT.USER.PROFILE(userId))
    .json<GetUserProfileResponse>();

  if (response.success === false) {
    throw new Error(response.message || '프로필을 불러오지 못했습니다.');
  }

  if (!hasValidPublicNickname(response.data)) {
    throw new Error('프로필 응답 형식이 올바르지 않습니다.');
  }

  const {
    profileImageUrl,
    nickname,
    verificationBadge,
    representativeTags,
    bio,
    isDeleted,
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
        if (!lastPage.data?.hasNext) {
          return undefined;
        }

        return (lastPage.data.page ?? 0) + 1;
      },
    }),
};

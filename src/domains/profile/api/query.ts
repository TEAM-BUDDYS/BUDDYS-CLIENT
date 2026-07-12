import { queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  USER_QUERY_KEY,
} from '@/shared/api';

import type {
  GetMyPostsParams,
  GetMyPostsResponse,
  GetMyProfileResponse,
  GetUserPostsParams,
  GetUserPostsResponse,
  GetUserProfileResponse,
} from './type';

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

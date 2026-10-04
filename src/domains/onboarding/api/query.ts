import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  COUNTRY_QUERY_KEY,
  createSearchParams,
  END_POINT,
  RECOMMENDATION_QUERY_KEY,
  USER_QUERY_KEY,
} from '@/shared/api';

import type {
  CheckNicknameParams,
  CheckNicknameResponse,
  CompleteOnboardingRequest,
  CompleteOnboardingResponse,
  GetRecommendedUsersParams,
  GetRecommendedUsersResponse,
  SearchUniversitiesParams,
  SearchUniversitiesResponse,
} from './type';

const completeOnboarding = async (body: CompleteOnboardingRequest) => {
  const response = await apiClient
    .patch(END_POINT.USER.ONBOARDING, {
      json: body,
    })
    .json<CompleteOnboardingResponse>();

  if (
    !response.success ||
    typeof response.data?.userId !== 'number' ||
    !response.data.nickname
  ) {
    throw new Error(response.message || '온보딩 정보를 저장하지 못했습니다.');
  }

  return response.data;
};

const searchUniversities = async (
  countryId: number,
  params: SearchUniversitiesParams,
) => {
  return apiClient
    .get(END_POINT.COUNTRY.UNIVERSITY_SEARCH(countryId), {
      searchParams: params,
    })
    .json<SearchUniversitiesResponse>();
};

const getRecommendedUsers = async (params?: GetRecommendedUsersParams) => {
  return apiClient
    .get(END_POINT.RECOMMENDATION.USERS, {
      searchParams: createSearchParams(params),
    })
    .json<GetRecommendedUsersResponse>();
};

const checkNickname = async (params: CheckNicknameParams) => {
  const response = await apiClient
    .get(END_POINT.USER.NICKNAME_CHECK, {
      searchParams: params,
    })
    .json<CheckNicknameResponse>();

  if (
    response.success !== true ||
    typeof response.data?.available !== 'boolean'
  ) {
    throw new Error('닉네임 중복 확인 응답이 올바르지 않습니다.');
  }

  return response.data;
};

export const ONBOARDING_QUERY_OPTIONS = {
  UNIVERSITY_SEARCH: (countryId: number, keyword: string) =>
    queryOptions({
      queryKey: COUNTRY_QUERY_KEY.UNIVERSITY_SEARCH(countryId, { keyword }),
      queryFn: () => searchUniversities(countryId, { keyword }),
    }),
  RECOMMENDED_USERS: (params?: GetRecommendedUsersParams) =>
    queryOptions({
      queryKey: RECOMMENDATION_QUERY_KEY.USERS(params),
      queryFn: () => getRecommendedUsers(params),
    }),
  NICKNAME_CHECK: (params: CheckNicknameParams) =>
    queryOptions({
      queryKey: USER_QUERY_KEY.NICKNAME_CHECK(params),
      queryFn: () => checkNickname(params),
      staleTime: 0,
      retry: false,
    }),
};

export const ONBOARDING_MUTATION_OPTIONS = {
  COMPLETE: () =>
    mutationOptions({
      mutationFn: (body: CompleteOnboardingRequest) => completeOnboarding(body),
    }),
};

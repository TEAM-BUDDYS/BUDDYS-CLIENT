import { infiniteQueryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  USER_QUERY_KEY,
} from '@/shared/api';

import type {
  CourseCompanion,
  SearchCourseCompanionsPage,
  SearchCourseCompanionsParams,
  SearchCourseCompanionsResponse,
} from './type';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isNullableString = (value: unknown) =>
  value === null || typeof value === 'string';

const isCourseCompanion = (value: unknown): value is CourseCompanion => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    Number.isSafeInteger(value.userId) &&
    Number(value.userId) > 0 &&
    typeof value.nickname === 'string' &&
    (value.profileImageUrl === undefined ||
      isNullableString(value.profileImageUrl))
  );
};

const searchCourseCompanions = async (
  params: SearchCourseCompanionsParams,
  signal?: AbortSignal,
) => {
  const response = await apiClient
    .get(END_POINT.USER.SEARCH, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<SearchCourseCompanionsResponse>();
  const data = response.data;

  if (
    !response.success ||
    !isRecord(data) ||
    !Array.isArray(data.users) ||
    !data.users.every(isCourseCompanion) ||
    !Number.isInteger(data.page) ||
    !Number.isInteger(data.size) ||
    typeof data.hasNext !== 'boolean'
  ) {
    throw new Error(
      response.message || '사용자 검색 결과를 불러오지 못했습니다.',
    );
  }

  return {
    users: data.users,
    page: Number(data.page),
    size: Number(data.size),
    hasNext: data.hasNext,
  } satisfies SearchCourseCompanionsPage;
};

export const COURSE_COMPANION_QUERY_OPTIONS = {
  SEARCH: (params: SearchCourseCompanionsParams) =>
    infiniteQueryOptions({
      queryKey: USER_QUERY_KEY.SEARCH(params),
      queryFn: ({ pageParam, signal }) =>
        searchCourseCompanions({ ...params, page: pageParam }, signal),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    }),
};

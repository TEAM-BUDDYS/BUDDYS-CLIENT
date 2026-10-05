import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import { USER_QUERY_KEY } from '../query-key';
import type { CheckNicknameParams, CheckNicknameResponse } from './type';

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

export const NICKNAME_QUERY_OPTIONS = {
  CHECK: (params: CheckNicknameParams) =>
    queryOptions({
      queryKey: USER_QUERY_KEY.NICKNAME_CHECK(params),
      queryFn: () => checkNickname(params),
      staleTime: 0,
      retry: false,
    }),
};

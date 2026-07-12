import { mutationOptions } from '@tanstack/react-query';

import { apiClient, createSearchParams, END_POINT } from '@/shared/api';

import type {
  KakaoLoginParams,
  KakaoLoginResponse,
  ReissueResponse,
} from './type';

const kakaoLogin = async (params: KakaoLoginParams) => {
  return apiClient
    .post(END_POINT.AUTH.KAKAO, {
      searchParams: createSearchParams(params),
    })
    .json<KakaoLoginResponse>();
};

const reissue = async () => {
  return apiClient.post(END_POINT.AUTH.REISSUE).json<ReissueResponse>();
};

export const AUTH_MUTATION_OPTIONS = {
  KAKAO_LOGIN: () =>
    mutationOptions({
      mutationFn: (params: KakaoLoginParams) => kakaoLogin(params),
    }),
  REISSUE: () =>
    mutationOptions({
      mutationFn: reissue,
    }),
};

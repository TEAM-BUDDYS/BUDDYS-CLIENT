import { mutationOptions } from '@tanstack/react-query';
import { isHTTPError, isKyError, isNetworkError, isTimeoutError } from 'ky';

import { apiClient, createSearchParams, END_POINT } from '@/shared/api';

import type { AuthSession } from '../model/auth';
import type {
  AuthErrorResponse,
  KakaoLoginParams,
  KakaoLoginResponse,
  ReissueResponse,
} from './type';

const AUTH_REQUEST_CONTEXT = {
  skipAuth: true,
  skipAuthRefresh: true,
};

const DEFAULT_AUTH_ERROR_MESSAGE = '로그인 처리에 실패했습니다.';

const getAuthErrorMessage = (error: unknown) => {
  if (isTimeoutError(error)) {
    return '요청 시간이 초과되었습니다. 다시 시도해 주세요.';
  }

  if (isNetworkError(error)) {
    return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
  }

  if (isHTTPError(error)) {
    if (error.response.status >= 500) {
      return '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    }

    const response = error.data as AuthErrorResponse | undefined;

    return response?.message || DEFAULT_AUTH_ERROR_MESSAGE;
  }

  return DEFAULT_AUTH_ERROR_MESSAGE;
};

const requestLoginSession = async (
  request: Promise<KakaoLoginResponse | ReissueResponse>,
): Promise<AuthSession> => {
  try {
    const response = await request;

    if (
      !response.success ||
      !response.data?.accessToken ||
      typeof response.data.onboardingCompleted !== 'boolean'
    ) {
      throw new Error(response.message || DEFAULT_AUTH_ERROR_MESSAGE);
    }

    return {
      accessToken: response.data.accessToken,
      onboardingCompleted: response.data.onboardingCompleted,
    };
  } catch (error) {
    if (!isKyError(error)) {
      throw error;
    }

    throw new Error(getAuthErrorMessage(error));
  }
};

export const loginWithKakao = async (params: KakaoLoginParams) =>
  requestLoginSession(
    apiClient
      .post(END_POINT.AUTH.KAKAO, {
        searchParams: createSearchParams(params),
        context: AUTH_REQUEST_CONTEXT,
      })
      .json<KakaoLoginResponse>(),
  );

export const reissueAccessToken = async () =>
  requestLoginSession(
    apiClient
      .post(END_POINT.AUTH.REISSUE, {
        context: AUTH_REQUEST_CONTEXT,
      })
      .json<ReissueResponse>(),
  );

export const AUTH_MUTATION_OPTIONS = {
  KAKAO_LOGIN: () =>
    mutationOptions({
      mutationFn: loginWithKakao,
    }),
  REISSUE: () =>
    mutationOptions({
      mutationFn: reissueAccessToken,
    }),
};

import { isHTTPError, isKyError, isNetworkError, isTimeoutError } from 'ky';

import { apiClient } from '@/shared/api';

import type { ApiResponse, LoginResponse } from '../model/auth';

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

    const response = error.data as Partial<ApiResponse<null>> | undefined;

    return response?.message || DEFAULT_AUTH_ERROR_MESSAGE;
  }

  return DEFAULT_AUTH_ERROR_MESSAGE;
};

const requestLoginSession = async (
  request: Promise<ApiResponse<LoginResponse>>,
) => {
  try {
    const response = await request;

    if (
      !response.success ||
      !response.data?.accessToken ||
      typeof response.data.onboardingCompleted !== 'boolean'
    ) {
      throw new Error(response.message || DEFAULT_AUTH_ERROR_MESSAGE);
    }

    return response.data;
  } catch (error) {
    if (!isKyError(error)) {
      throw error;
    }

    throw new Error(getAuthErrorMessage(error));
  }
};

export const loginWithKakao = async (code: string) =>
  requestLoginSession(
    apiClient
      .post('api/v1/auth/kakao', {
        searchParams: { code },
        context: AUTH_REQUEST_CONTEXT,
      })
      .json<ApiResponse<LoginResponse>>(),
  );

export const reissueAccessToken = async () =>
  requestLoginSession(
    apiClient
      .post('api/v1/auth/reissue', {
        context: AUTH_REQUEST_CONTEXT,
      })
      .json<ApiResponse<LoginResponse>>(),
  );

'use client';

let accessToken: string | null = null;
let refreshHandler: (() => Promise<string>) | null = null;
let refreshPromise: Promise<string> | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const setAccessTokenRefreshHandler = (
  handler: (() => Promise<string>) | null,
) => {
  refreshHandler = handler;
};

export const refreshAccessToken = async () => {
  if (!refreshHandler) {
    throw new Error('Access token refresh handler is not registered');
  }

  // 여러 요청이 동시에 401을 받아도 토큰 재발급은 한 번만 실행합니다.
  if (!refreshPromise) {
    refreshPromise = refreshHandler().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

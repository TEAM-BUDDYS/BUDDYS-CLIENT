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

  if (!refreshPromise) {
    refreshPromise = refreshHandler().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

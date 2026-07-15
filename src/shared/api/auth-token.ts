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

  if (!handler) {
    refreshPromise = null;
  }
};

export const refreshAccessToken = async () => {
  if (!refreshHandler) {
    throw new Error('Access token refresh handler is not registered');
  }

  if (!refreshPromise) {
    const currentRefreshPromise = refreshHandler().finally(() => {
      if (refreshPromise === currentRefreshPromise) {
        refreshPromise = null;
      }
    });

    refreshPromise = currentRefreshPromise;
  }

  return refreshPromise;
};

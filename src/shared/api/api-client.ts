'use client';

import ky from 'ky';

import { getAccessToken, refreshAccessToken } from './auth-token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export const apiClient = ky.create({
  prefix: API_BASE_URL,
  credentials: 'include',
  timeout: 10000,
  retry: {
    limit: 1,
    shouldRetry: () => false,
  },
  hooks: {
    beforeRequest: [
      ({ request, options }) => {
        if (options.context.skipAuth) {
          return;
        }

        const accessToken = getAccessToken();

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      ({ response, options, retryCount }) => {
        if (
          response.status === 401 &&
          !options.context.skipAuthRefresh &&
          retryCount === 0
        ) {
          return ky.retry({ delay: 0 });
        }
      },
    ],
    beforeRetry: [
      async ({ request, options }) => {
        if (options.context.skipAuthRefresh) {
          return ky.stop;
        }

        const accessToken = await refreshAccessToken();
        request.headers.set('Authorization', `Bearer ${accessToken}`);
      },
    ],
  },
});

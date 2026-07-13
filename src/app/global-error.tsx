'use client';

import './globals.css';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="min-h-dvh">
        <title>오류 | BUDDYS</title>
        <main className="mx-auto flex min-h-dvh w-full max-w-[430px] min-w-[375px] flex-col items-center justify-center bg-white px-4 text-center">
          <h1 className="text-title-b-20 text-gray-800">문제가 발생했어요</h1>
          <p className="text-body-r-14 mt-1 text-gray-500">
            잠시 후 다시 시도해 주세요.
          </p>
          <button
            type="button"
            className="text-body-sb-16 bg-mint-300 active:bg-mint-400 mt-6 h-13 w-full max-w-60 rounded-xl px-4 text-white"
            onClick={unstable_retry}
          >
            다시 시도
          </button>
        </main>
      </body>
    </html>
  );
}

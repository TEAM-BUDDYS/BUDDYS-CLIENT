import { Suspense } from 'react';

import { GoogleCallback } from '@/domains/auth/features/google-login/google-callback';

const GoogleCallbackPage = () => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh items-center justify-center px-4 text-center">
          <div className="flex flex-col gap-2" role="status" aria-live="polite">
            <h1 className="text-title-b-22 text-gray-800">로그인 중</h1>
            <p className="text-body-m-15 text-gray-500">
              구글 계정을 확인하고 있어요.
            </p>
          </div>
        </main>
      }
    >
      <GoogleCallback />
    </Suspense>
  );
};

export default GoogleCallbackPage;

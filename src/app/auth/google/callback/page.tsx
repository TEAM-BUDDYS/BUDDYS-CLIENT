import { Suspense } from 'react';

import { GoogleCallback } from '@/domains/auth/features/google-login/google-callback';

const GoogleCallbackPage = () => {
  return (
    <Suspense fallback={<main>로그인 중</main>}>
      <GoogleCallback />
    </Suspense>
  );
};

export default GoogleCallbackPage;

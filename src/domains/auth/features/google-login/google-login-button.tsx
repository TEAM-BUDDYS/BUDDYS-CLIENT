'use client';

import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { GoogleIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { useAuthSession } from '../auth-session/auth-session-provider';
import { createGoogleAuthorizeUrl } from './google-oauth';

export const GoogleLoginButton = () => {
  const router = useRouter();
  const { status, onboardingCompleted } = useAuthSession();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(onboardingCompleted ? ROUTES.HOME : ROUTES.ONBOARDING);
    }
  }, [onboardingCompleted, router, status]);

  const handleLoginClick = () => {
    setIsRedirecting(true);

    try {
      window.location.assign(createGoogleAuthorizeUrl());
    } catch (error) {
      setIsRedirecting(false);
      Sentry.captureException(error);

      if (process.env.NODE_ENV === 'development') {
        console.error('구글 로그인 URL 생성에 실패했습니다.', error);
      }
    }
  };

  const isDisabled = isRedirecting || status !== 'unauthenticated';

  return (
    <Button
      variant="login"
      align="center"
      icon={<GoogleIcon />}
      iconSize="lg"
      className="border border-gray-200 bg-white"
      disabled={isDisabled}
      onClick={handleLoginClick}
    >
      Google로 시작하기
    </Button>
  );
};

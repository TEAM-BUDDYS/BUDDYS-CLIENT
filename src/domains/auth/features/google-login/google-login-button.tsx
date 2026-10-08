'use client';

import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';

import { GoogleIcon } from '@/shared/components/icons';
import { Button, useToast } from '@/shared/components/ui';

import { useAuthSession } from '../auth-session/auth-session-provider';
import { createGoogleAuthorizeUrl } from './google-oauth';

export const GoogleLoginButton = () => {
  const { status } = useAuthSession();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { showToast } = useToast();

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

      showToast(
        '로그인 화면을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
        {
          variant: 'gray',
        },
      );
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

'use client';

import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { KakaoIcon } from '@/shared/components/icons';
import { Button, useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { useAuthSession } from '../auth-session/auth-session-provider';
import { createKakaoAuthorizeUrl } from './kakao-oauth';

export const KakaoLoginButton = () => {
  const router = useRouter();
  const { status, onboardingCompleted } = useAuthSession();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(onboardingCompleted ? ROUTES.HOME : ROUTES.ONBOARDING);
    }
  }, [onboardingCompleted, router, status]);

  const handleLoginClick = () => {
    setIsRedirecting(true);

    try {
      window.location.assign(createKakaoAuthorizeUrl());
    } catch (error) {
      setIsRedirecting(false);
      Sentry.captureException(error);

      if (process.env.NODE_ENV === 'development') {
        console.error('카카오 로그인 URL 생성에 실패했습니다.', error);
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
      icon={<KakaoIcon />}
      iconSize="lg"
      className="bg-[#FAE100]"
      disabled={isDisabled}
      onClick={handleLoginClick}
    >
      카카오로 시작하기
    </Button>
  );
};

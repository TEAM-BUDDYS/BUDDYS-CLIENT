'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { KakaoIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui';

import { useAuthSession } from '../auth-session/auth-session-provider';
import { createKakaoAuthorizeUrl } from './kakao-oauth';

export const KakaoLoginButton = () => {
  const router = useRouter();
  const { status, onboardingCompleted } = useAuthSession();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(onboardingCompleted ? '/' : '/onboarding');
    }
  }, [onboardingCompleted, router, status]);

  const handleLoginClick = () => {
    setIsRedirecting(true);

    try {
      window.location.assign(createKakaoAuthorizeUrl());
    } catch {
      setIsRedirecting(false);
    }
  };

  const isDisabled = isRedirecting || status !== 'unauthenticated';

  return (
    <Button
      variant="kakao"
      align="center"
      icon={<KakaoIcon />}
      iconSize="lg"
      disabled={isDisabled}
      onClick={handleLoginClick}
    >
      카카오로 시작하기
    </Button>
  );
};

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Button, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { useAuthSession } from '../auth-session/auth-session-provider';
import { getKakaoRedirectUri, validateKakaoOAuthState } from './kakao-oauth';

export const KakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authenticateWithKakao } = useAuthSession();
  const hasStartedRef = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const oauthError = searchParams.get('error');

    window.history.replaceState(
      window.history.state,
      '',
      window.location.pathname,
    );

    if (oauthError || !code) {
      queueMicrotask(() => {
        setErrorMessage('카카오 로그인이 취소되었거나 올바르지 않습니다.');
      });
      return;
    }

    if (!validateKakaoOAuthState(state)) {
      queueMicrotask(() => {
        setErrorMessage(
          '로그인 요청을 확인할 수 없습니다. 다시 시도해 주세요.',
        );
      });
      return;
    }

    const completeKakaoLogin = async () => {
      const loginSession = await authenticateWithKakao({
        code,
        redirectUri: getKakaoRedirectUri(),
      });

      router.replace(
        loginSession.onboardingCompleted ? ROUTES.HOME : ROUTES.ONBOARDING,
      );
    };

    void completeKakaoLogin().catch((error: unknown) => {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : '카카오 로그인에 실패했습니다. 다시 시도해 주세요.',
      );
    });
  }, [authenticateWithKakao, router, searchParams]);

  if (errorMessage) {
    return (
      <main className="relative flex min-h-dvh flex-col px-4 pb-8.5">
        <EmptyState
          className="absolute top-1/2 right-4 left-4 -mt-3 -translate-y-1/2"
          title="로그인에 실패했어요"
          description="잠시 후 다시 시도하거나 로그인 정보를 확인해주세요"
        />

        <Button
          className="mt-auto"
          onClick={() => router.replace(ROUTES.AUTH.LOGIN)}
        >
          로그인 화면으로 돌아가기
        </Button>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 text-center">
      <div className="flex flex-col gap-2" role="status" aria-live="polite">
        <h1 className="text-title-b-22 text-gray-800">로그인 중</h1>
        <p className="text-body-m-15 text-gray-500">
          카카오 계정을 확인하고 있어요.
        </p>
      </div>
    </main>
  );
};

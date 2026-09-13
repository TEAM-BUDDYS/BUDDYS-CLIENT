'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '@/shared/config';

import { useAuthSession } from './auth-session-provider';

export const LoginRedirect = () => {
  const router = useRouter();
  const { onboardingCompleted, status } = useAuthSession();
  const redirectTarget =
    status === 'authenticated' && onboardingCompleted !== null
      ? onboardingCompleted
        ? ROUTES.HOME
        : ROUTES.ONBOARDING
      : null;

  useEffect(() => {
    if (redirectTarget) {
      router.replace(redirectTarget);
    }
  }, [redirectTarget, router]);

  return null;
};

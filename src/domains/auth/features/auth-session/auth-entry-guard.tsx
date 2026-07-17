'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

import { AsyncLoadingState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { useAuthSession } from './auth-session-provider';

interface AuthEntryGuardProps {
  children: ReactNode;
}

export const AuthEntryGuard = ({ children }: AuthEntryGuardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isOnboardingCompletionVisible, onboardingCompleted, status } =
    useAuthSession();
  const isOnboardingRoute = pathname === ROUTES.ONBOARDING;
  const shouldRedirectToOnboarding =
    status === 'authenticated' &&
    onboardingCompleted === false &&
    !isOnboardingRoute;
  const shouldRedirectToHome =
    status === 'authenticated' &&
    onboardingCompleted === true &&
    isOnboardingRoute &&
    !isOnboardingCompletionVisible;
  const redirectTarget =
    status === 'unauthenticated'
      ? ROUTES.LANDING
      : shouldRedirectToOnboarding
        ? ROUTES.ONBOARDING
        : shouldRedirectToHome
          ? ROUTES.HOME
          : null;

  useEffect(() => {
    if (redirectTarget) {
      router.replace(redirectTarget);
    }
  }, [redirectTarget, router]);

  if (
    status === 'initializing' ||
    (status === 'authenticated' && onboardingCompleted === null) ||
    redirectTarget
  ) {
    return <AsyncLoadingState />;
  }

  return <>{children}</>;
};

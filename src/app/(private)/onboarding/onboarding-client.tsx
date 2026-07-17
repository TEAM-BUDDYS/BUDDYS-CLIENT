'use client';

import { useCallback, useEffect, useRef } from 'react';

import { useAuthSession } from '@/domains/auth/features/auth-session/auth-session-provider';
import { OnboardFlow } from '@/domains/onboarding/features/onboard/onboard-flow';

export const OnboardingClient = () => {
  const { finishOnboarding, markOnboardingCompleted } = useAuthSession();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      finishOnboarding();
    };
  }, [finishOnboarding]);

  const handleCompleted = useCallback(() => {
    markOnboardingCompleted({
      showCompletion: isMountedRef.current,
    });
  }, [markOnboardingCompleted]);

  return (
    <OnboardFlow onCompleted={handleCompleted} onStart={finishOnboarding} />
  );
};

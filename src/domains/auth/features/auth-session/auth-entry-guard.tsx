'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

import { AsyncLoadingState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { useAuthSession } from './auth-session-provider';

interface AuthEntryGuardProps {
  children: ReactNode;
}

export const AuthEntryGuard = ({ children }: AuthEntryGuardProps) => {
  const router = useRouter();
  const { status } = useAuthSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(ROUTES.LANDING);
    }
  }, [router, status]);

  if (status === 'initializing') {
    return <AsyncLoadingState />;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
};

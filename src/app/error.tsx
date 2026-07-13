'use client';

import * as Sentry from '@sentry/nextjs';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useEffect } from 'react';

import { AsyncErrorState } from '@/shared/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function Error({ error, unstable_retry }: ErrorProps) {
  const { reset: resetQueryErrors } = useQueryErrorResetBoundary();

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const handleRetry = () => {
    resetQueryErrors();
    unstable_retry();
  };

  return (
    <main>
      <AsyncErrorState onRetry={handleRetry} />
    </main>
  );
}

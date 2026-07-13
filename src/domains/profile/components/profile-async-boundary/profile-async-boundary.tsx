'use client';

import type { ReactNode } from 'react';

import { AsyncBoundary, AsyncErrorState } from '@/shared/components/ui';

interface ProfileAsyncBoundaryProps {
  children: ReactNode;
}

export function ProfileAsyncBoundary({ children }: ProfileAsyncBoundaryProps) {
  return (
    <AsyncBoundary
      loadingState={{ title: '프로필을 불러오고 있어요' }}
      errorFallback={({ error, reset }) => (
        <AsyncErrorState
          title="프로필을 불러오지 못했어요"
          description={error instanceof Error ? error.message : undefined}
          onRetry={reset}
        />
      )}
    >
      {children}
    </AsyncBoundary>
  );
}

'use client';

import { isHTTPError } from 'ky';
import type { ReactNode } from 'react';

import {
  AsyncBoundary,
  type AsyncBoundaryErrorFallbackProps,
  AsyncErrorState,
} from '@/shared/components/ui';

import { PostNotFoundView } from './post-not-found-view';

interface PostDetailAsyncBoundaryProps {
  children: ReactNode;
}

const PostDetailErrorFallback = ({
  error,
  reset,
}: AsyncBoundaryErrorFallbackProps) => {
  if (isHTTPError(error) && error.response.status === 404) {
    return <PostNotFoundView />;
  }

  return <AsyncErrorState onRetry={reset} />;
};

export const PostDetailAsyncBoundary = ({
  children,
}: PostDetailAsyncBoundaryProps) => {
  return (
    <AsyncBoundary errorFallback={PostDetailErrorFallback}>
      {children}
    </AsyncBoundary>
  );
};

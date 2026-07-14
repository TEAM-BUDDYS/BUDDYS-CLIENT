'use client';

import * as Sentry from '@sentry/nextjs';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { unstable_rethrow } from 'next/navigation';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary, type ErrorBoundaryProps } from 'react-error-boundary';

import {
  AsyncErrorState,
  type AsyncErrorStateProps,
} from './async-error-state';
import {
  AsyncLoadingState,
  type AsyncLoadingStateProps,
} from './async-loading-state';
import { DelayedFallback } from './delayed-fallback';

type ErrorStateOptions = Omit<AsyncErrorStateProps, 'className' | 'onRetry'>;
type LoadingStateOptions = Omit<AsyncLoadingStateProps, 'className'>;

export interface AsyncBoundaryErrorFallbackProps {
  error: unknown;
  reset: () => void;
}

export interface AsyncBoundaryProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: (props: AsyncBoundaryErrorFallbackProps) => ReactNode;
  loadingDelayMs?: number;
  loadingState?: LoadingStateOptions;
  errorState?: ErrorStateOptions;
  className?: string;
  resetKeys?: unknown[];
  onError?: ErrorBoundaryProps['onError'];
}

export const AsyncBoundary = ({
  children,
  loadingFallback,
  errorFallback,
  loadingDelayMs,
  loadingState,
  errorState,
  className,
  resetKeys,
  onError,
}: AsyncBoundaryProps) => {
  const resolvedLoadingFallback =
    loadingFallback !== undefined ? (
      loadingFallback
    ) : (
      <AsyncLoadingState {...loadingState} className={className} />
    );

  const handleError: NonNullable<ErrorBoundaryProps['onError']> = (
    error,
    info,
  ) => {
    Sentry.captureException(error);
    onError?.(error, info);
  };

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => {
            unstable_rethrow(error);

            if (errorFallback) {
              return errorFallback({ error, reset: resetErrorBoundary });
            }

            return (
              <AsyncErrorState
                {...errorState}
                className={className}
                onRetry={resetErrorBoundary}
              />
            );
          }}
          onError={handleError}
          onReset={reset}
          resetKeys={resetKeys}
        >
          <Suspense
            fallback={
              <DelayedFallback delayMs={loadingDelayMs}>
                {resolvedLoadingFallback}
              </DelayedFallback>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

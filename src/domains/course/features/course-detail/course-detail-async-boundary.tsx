'use client';

import { isHTTPError } from 'ky';
import type { ReactNode } from 'react';

import {
  AsyncBoundary,
  type AsyncBoundaryErrorFallbackProps,
  AsyncErrorState,
} from '@/shared/components/ui';

import { CourseNotFoundView } from './course-not-found-view';

interface CourseDetailAsyncBoundaryProps {
  children: ReactNode;
  courseId: number;
}

const isCourseNotFoundError = (error: unknown) =>
  isHTTPError(error) && error.response.status === 404;

const CourseDetailErrorFallback = ({
  error,
  reset,
}: AsyncBoundaryErrorFallbackProps) => {
  if (isCourseNotFoundError(error)) {
    return <CourseNotFoundView />;
  }

  return <AsyncErrorState title="코스를 불러오지 못했어요" onRetry={reset} />;
};

export const CourseDetailAsyncBoundary = ({
  children,
  courseId,
}: CourseDetailAsyncBoundaryProps) => {
  return (
    <AsyncBoundary
      errorFallback={CourseDetailErrorFallback}
      loadingState={{ title: '코스를 불러오고 있어요' }}
      resetKeys={[courseId]}
      shouldReportError={(error) => !isCourseNotFoundError(error)}
    >
      {children}
    </AsyncBoundary>
  );
};

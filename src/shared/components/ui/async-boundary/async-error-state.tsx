'use client';

import { cn } from '@/lib/cn';

import { Button } from '../button/button';
import { EmptyState } from '../empty-state/empty-state';

export interface AsyncErrorStateProps {
  title?: string;
  description?: string;
  retryLabel?: string;
  className?: string;
  onRetry: () => void;
}

export const AsyncErrorState = ({
  title = '문제가 발생했어요',
  description = '잠시 후 다시 시도해 주세요.',
  retryLabel = '다시 시도',
  className,
  onRetry,
}: AsyncErrorStateProps) => {
  return (
    <div
      role="alert"
      className={cn(
        'flex w-full flex-col items-center justify-center px-4 py-10',
        className,
      )}
    >
      <EmptyState title={title} description={description} />
      <Button className="mt-6 max-w-60" onClick={onRetry}>
        {retryLabel}
      </Button>
    </div>
  );
};

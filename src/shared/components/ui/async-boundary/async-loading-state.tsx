import { cn } from '@/lib/cn';

import { EmptyState } from '../empty-state/empty-state';

export interface AsyncLoadingStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const AsyncLoadingState = ({
  title = '화면을 불러오고 있어요',
  description = '잠시만 기다려 주세요.',
  className,
}: AsyncLoadingStateProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex min-h-dvh w-full items-center justify-center px-4 py-10',
        className,
      )}
    >
      <EmptyState title={title} description={description} />
    </div>
  );
};

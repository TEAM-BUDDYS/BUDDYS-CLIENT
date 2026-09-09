import { cn } from '@/lib/cn';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      aria-hidden
      className={cn('animate-skeleton-wave bg-gray-200/20', className)}
    />
  );
};

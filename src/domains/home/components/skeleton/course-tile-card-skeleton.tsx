import { cn } from '@/lib/cn';
import { Skeleton } from '@/shared/components/ui/skeleton/skeleton';

interface CourseTileCardSkeletonProps {
  className?: string;
}

export const CourseTileCardSkeleton = ({
  className,
}: CourseTileCardSkeletonProps) => {
  return (
    <div
      aria-hidden
      className={cn('flex w-32.5 flex-col items-start gap-2.25', className)}
    >
      <Skeleton className="size-32.5 rounded-lg" />

      <div className="flex w-32.5 flex-col items-start gap-1">
        <Skeleton className="my-0.5 h-5 w-full rounded-[3px]" />
        <Skeleton className="my-0.5 h-3.5 w-3/4 rounded-[3px]" />
      </div>
    </div>
  );
};

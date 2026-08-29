import { cn } from '@/lib/cn';
import { Skeleton } from '@/shared/components/ui/skeleton/skeleton';

const SKELETON_IMAGE_KEYS = [1, 2, 3, 4] as const;

interface CardListSkeletonProps {
  className?: string;
}

export const CardListSkeleton = ({ className }: CardListSkeletonProps) => {
  return (
    <div
      aria-hidden
      className={cn(
        'flex w-full min-w-0 flex-col items-start gap-3 overflow-clip',
        className,
      )}
    >
      <div className="flex w-52 flex-col items-start gap-1">
        <Skeleton className="my-0.5 h-5 w-full rounded-[3px]" />
        <Skeleton className="my-0.5 h-3.5 w-3/4 rounded-[3px]" />
      </div>

      <div className="flex items-start gap-2">
        {SKELETON_IMAGE_KEYS.map((imageKey) => (
          <Skeleton key={imageKey} className="size-25 shrink-0 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

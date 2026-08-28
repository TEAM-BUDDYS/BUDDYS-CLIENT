import { cn } from '@/lib/cn';

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
        <div className="flex h-6 w-full items-start py-0.5">
          <div className="animate-skeleton-wave h-full w-full min-w-0 rounded-[3px] bg-gray-200/20" />
        </div>
        <div className="flex h-4.5 w-full items-start py-0.5">
          <div className="animate-skeleton-wave h-full w-3/4 rounded-[3px] bg-gray-200/30" />
        </div>
      </div>

      <div className="flex items-start gap-2">
        {SKELETON_IMAGE_KEYS.map((imageKey) => (
          <div
            key={imageKey}
            className="animate-skeleton-wave size-25 shrink-0 rounded-lg bg-gray-200/20"
          />
        ))}
      </div>
    </div>
  );
};

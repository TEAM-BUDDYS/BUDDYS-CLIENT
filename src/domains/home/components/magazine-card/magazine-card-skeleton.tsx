import { cn } from '@/lib/cn';
import { Skeleton } from '@/shared/components/ui/skeleton/skeleton';

interface MagazineCardSkeletonProps {
  className?: string;
}

export const MagazineCardSkeleton = ({
  className,
}: MagazineCardSkeletonProps) => {
  return (
    <div
      aria-hidden
      className={cn('flex w-full flex-col items-start gap-3', className)}
    >
      <Skeleton className="aspect-343/192 w-full rounded-lg" />

      <div className="flex w-full flex-col items-start gap-2">
        <Skeleton className="my-0.5 h-5 w-full rounded-[3px]" />
        <Skeleton className="my-0.5 h-3.5 w-[77.84%] rounded-[3px]" />
      </div>
    </div>
  );
};

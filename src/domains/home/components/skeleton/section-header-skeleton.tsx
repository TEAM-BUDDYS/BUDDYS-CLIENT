import { cn } from '@/lib/cn';
import { Skeleton } from '@/shared/components/ui/skeleton/skeleton';

interface SectionHeaderSkeletonProps {
  className?: string;
}

export const SectionHeaderSkeleton = ({
  className,
}: SectionHeaderSkeletonProps) => {
  return (
    <div aria-hidden className={cn('flex h-10 items-center', className)}>
      <Skeleton className="h-6.5 w-56 rounded-[3px]" />
    </div>
  );
};

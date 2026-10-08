import { Skeleton } from '@/shared/components/ui';

export const CourseSaveCardSkeleton = () => {
  return (
    <article
      role="status"
      aria-label="장소 정보를 불러오는 중"
      className="flex w-full items-center gap-4"
    >
      <Skeleton className="size-25 shrink-0 rounded-xl" />

      <div className="flex min-w-0 flex-1 items-center gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-32 rounded-sm" />
          <div className="flex min-w-0 flex-col gap-1">
            <Skeleton className="h-4 w-full max-w-52 rounded-sm" />
            <Skeleton className="h-4 w-16 rounded-sm" />
          </div>
        </div>

        <Skeleton className="size-6 shrink-0 rounded-sm" />
      </div>
    </article>
  );
};

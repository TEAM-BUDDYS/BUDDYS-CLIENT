import type { CourseDay } from '@/domains/course/api/type';
import { formatCourseCost } from '@/domains/course/utils/course-day';
import { cn } from '@/lib/cn';

interface CourseDayMemoCostProps extends Pick<CourseDay, 'memo' | 'cost'> {
  className?: string;
}

export const CourseDayMemoCost = ({
  memo,
  cost,
  className,
}: CourseDayMemoCostProps) => {
  const hasMemo = Boolean(memo?.trim());
  const hasCost = cost != null;

  if (!hasMemo && !hasCost) {
    return null;
  }

  return (
    <dl className={cn('flex flex-col gap-4', className)}>
      {hasMemo && (
        <div className="flex flex-col gap-2">
          <dt className="text-body-sb-15 text-gray-800">메모</dt>
          <dd className="text-body-r-14 min-h-10 rounded-[10px] border border-gray-100 px-4 py-2 whitespace-pre-wrap text-gray-800">
            {memo}
          </dd>
        </div>
      )}

      {hasCost && (
        <div className="flex flex-col gap-2">
          <dt className="text-body-sb-15 text-gray-800">비용</dt>
          <dd className="text-body-r-14 flex min-h-10 items-center rounded-[10px] border border-gray-100 px-4 py-2 text-gray-800">
            {formatCourseCost(cost)}
          </dd>
        </div>
      )}
    </dl>
  );
};

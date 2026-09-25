import type { CourseDay } from '@/domains/course/api/type';
import { formatCourseDayDate } from '@/domains/course/utils/course-day';
import { cn } from '@/lib/cn';

interface CourseDayHeaderProps extends Pick<CourseDay, 'dayNumber' | 'date'> {
  id?: string;
  className?: string;
}

export const CourseDayHeader = ({
  dayNumber,
  date,
  id,
  className,
}: CourseDayHeaderProps) => {
  const formattedDate = formatCourseDayDate(date);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <h2 id={id} className="text-body-sb-14 text-gray-800">
        Day {dayNumber}
      </h2>
      {formattedDate && (
        <time
          className="text-body-r-14 text-gray-200"
          dateTime={date ?? undefined}
        >
          | {formattedDate}
        </time>
      )}
    </div>
  );
};

import { cn } from '@/lib/cn';
import { CalendarIcon } from '@/shared/components/icons';
import { formatDateRange } from '@/shared/utils/format-date-range';

interface CardDateProps {
  startDate: string;
  endDate: string;
  isArchiveCardDate?: boolean;
  className?: string;
}
export const CardDate = ({
  startDate,
  endDate,
  isArchiveCardDate,
  className,
}: CardDateProps) => {
  const { formattedEndDate, formattedStartDate } = formatDateRange({
    endDate,
    startDate,
  });
  const dateText =
    startDate === endDate
      ? formattedStartDate
      : `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div className="flex gap-1">
      <CalendarIcon className={cn('text-mint-300 size-4', className)} />
      <span
        className={cn(
          isArchiveCardDate
            ? 'text-caption-m-10 text-gray-300'
            : 'text-caption-r-12 text-gray-500',
          className,
        )}
      >
        {dateText}
      </span>
    </div>
  );
};

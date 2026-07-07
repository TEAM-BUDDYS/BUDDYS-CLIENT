import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import { CalendarIcon } from '@/shared/components/icons';
import { formatDateWithWeekday } from '@/shared/utils/format-date-range';

interface DateSelectButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  label?: string;
  dateRange?: {
    startDate?: Date | null;
    endDate?: Date | null;
  };
}

export const DateSelectButton = ({
  label = '출발일/도착일',
  dateRange,
  className,
  type = 'button',
  ...props
}: DateSelectButtonProps) => {
  const startDate = dateRange?.startDate;
  const endDate = dateRange?.endDate;
  const hasSelectedDateRange = Boolean(startDate && endDate);
  const displayText =
    startDate && endDate
      ? `${formatDateWithWeekday(startDate)} ~ ${formatDateWithWeekday(endDate)}`
      : label;

  return (
    <button
      className={cn(
        'text-body-sb-15 focus-visible:outline-mint-300 group border-mint-300 active:bg-mint-300 inline-flex h-13 items-center justify-center gap-3 rounded-[10px] border bg-white px-4 text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid active:text-white',
        hasSelectedDateRange && 'text-gray-800',
        className,
      )}
      type={type}
      {...props}
    >
      <CalendarIcon className="text-mint-300 size-4 shrink-0 group-active:text-white" />
      <span className="truncate">{displayText}</span>
    </button>
  );
};

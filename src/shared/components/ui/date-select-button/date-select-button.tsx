import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@lib/cn';
import { CalendarIcon } from '@shared/components/icons';

interface DateSelectButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  label: string;
  date?: Date | null;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

const formatDateButtonText = (date: Date) => {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekday = WEEKDAYS[date.getDay()];

  return `${year}.${month}.${day} (${weekday})`;
};

export const DateSelectButton = ({
  label,
  date,
  className,
  type = 'button',
  ...props
}: DateSelectButtonProps) => {
  const hasSelectedDate = Boolean(date);
  const displayText = date ? formatDateButtonText(date) : label;

  return (
    <button
      className={cn(
        'text-body-sb-15 focus-visible:outline-mint-300 group border-mint-300 active:bg-mint-300 flex h-13 w-37 items-center justify-center gap-3 rounded-[10px] border bg-white text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid active:text-white',
        hasSelectedDate && 'text-gray-800',
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

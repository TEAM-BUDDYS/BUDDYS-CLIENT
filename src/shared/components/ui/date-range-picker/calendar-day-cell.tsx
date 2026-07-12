import { cn } from '@/lib/cn';

import {
  type CalendarDayTypes,
  checkBeforeDate,
  checkBetweenDates,
  checkSameDate,
  type DateRangeTypes,
} from './date-utils';

const DAYS_IN_WEEK = 7;

interface CalendarDayCellProps {
  day: CalendarDayTypes;
  dayIndex: number;
  value: DateRangeTypes;
  minDate: Date;
  onSelect: (date: Date) => void;
}

export const CalendarDayCell = ({
  day,
  dayIndex,
  value,
  minDate,
  onSelect,
}: CalendarDayCellProps) => {
  const isDisabled = !day.isCurrentMonth || checkBeforeDate(day.date, minDate);
  const isStartDate = checkSameDate(day.date, value.startDate);
  const isEndDate = checkSameDate(day.date, value.endDate);
  const isSelected = isStartDate || isEndDate;
  const isBetween = checkBetweenDates(day.date, value.startDate, value.endDate);
  const isRange = isSelected || isBetween;
  const hasSelectedRange = Boolean(value.startDate && value.endDate);
  const isSingleDayRange = isStartDate && isEndDate;
  const isWeekStart = dayIndex % DAYS_IN_WEEK === 0;
  const isWeekEnd = dayIndex % DAYS_IN_WEEK === DAYS_IN_WEEK - 1;
  const shouldShowRangeLine =
    isRange && hasSelectedRange && !isSingleDayRange && !isDisabled;
  const shouldExtendRangeLeft = isBetween || (isEndDate && !isWeekStart);
  const shouldExtendRangeRight = isBetween || (isStartDate && !isWeekEnd);

  return (
    <div className="relative flex h-12 w-full items-center justify-center">
      {shouldShowRangeLine && (
        <div
          className={cn(
            'bg-mint-50 absolute top-1/2 h-10 -translate-y-1/2',
            shouldExtendRangeLeft ? 'left-0' : 'left-1/2',
            shouldExtendRangeRight ? 'right-0' : 'right-1/2',
          )}
        />
      )}
      <button
        aria-label={`${day.date.getFullYear()}년 ${day.date.getMonth() + 1}월 ${day.date.getDate()}일`}
        aria-selected={isSelected}
        disabled={isDisabled}
        role="gridcell"
        type="button"
        className={cn(
          'text-body-sb-15 relative z-10 flex size-10 items-center justify-center rounded-full text-gray-800 transition-colors',
          'focus-visible:outline-mint-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
          !isSelected && !isDisabled && 'hover:bg-gray-50',
          isSelected && !isDisabled && 'bg-mint-300 text-white',
          isBetween && !isSelected && !isDisabled && 'text-mint-300',
          isDisabled && 'text-gray-200',
        )}
        onClick={() => onSelect(day.date)}
      >
        {day.date.getDate()}
      </button>
    </div>
  );
};

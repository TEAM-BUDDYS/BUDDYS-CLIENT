'use client';

import { useId } from 'react';

import { cn } from '@/lib/cn';
import { BottomSheet } from '@/shared/components/ui';
import {
  formatDateToIsoDate,
  formatMonthDayWithWeekday,
} from '@/shared/utils/format-date-range';

interface CourseDayPickerSheetProps {
  open: boolean;
  dates: Date[];
  selectedDayNumber: number | null;
  onClose: () => void;
  onDaySelect: (dayNumber: number) => void;
}

export const CourseDayPickerSheet = ({
  open,
  dates,
  selectedDayNumber,
  onClose,
  onDaySelect,
}: CourseDayPickerSheetProps) => {
  const titleId = useId();
  const hasSelectedDay =
    selectedDayNumber !== null &&
    Number.isInteger(selectedDayNumber) &&
    selectedDayNumber >= 1 &&
    selectedDayNumber <= dates.length;

  if (!open) {
    return null;
  }

  return (
    <BottomSheet
      open
      ariaLabelledBy={titleId}
      className="flex flex-col"
      onClose={onClose}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-4">
        <h2
          className="text-body-sb-14 shrink-0 px-4 text-gray-500"
          id={titleId}
        >
          날짜 선택
        </h2>

        <ul className="flex min-h-0 flex-1 scrollbar-none flex-col overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden">
          {dates.map((date, index) => {
            const dayNumber = index + 1;
            const isSelected = selectedDayNumber === dayNumber;

            return (
              <li key={dayNumber}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  className={cn(
                    'text-body-m-15 focus-visible:outline-mint-300 flex h-13 w-full items-center gap-2 rounded-xl px-4 py-3 text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
                    isSelected && 'bg-gray-50',
                    hasSelectedDay && !isSelected && 'text-gray-500',
                  )}
                  onClick={() => onDaySelect(dayNumber)}
                >
                  <span>{`Day ${dayNumber}`}</span>
                  <time dateTime={formatDateToIsoDate(date)}>
                    {formatMonthDayWithWeekday(date)}
                  </time>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </BottomSheet>
  );
};

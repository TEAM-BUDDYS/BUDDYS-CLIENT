'use client';

import { type UIEvent, useId, useMemo, useRef, useState } from 'react';

import { cn } from '@lib/cn';
import { XIcon } from '@shared/components/icons';
import { BottomSheet } from '@shared/components/ui/bottom-sheet/bottom-sheet';
import { Button } from '@shared/components/ui/button/button';

import { CalendarMonth } from './calendar-month';
import {
  createMonths,
  type DateRangeTypes,
  getNextDateRange,
  getStartOfDay,
} from './date-utils';

const DEFAULT_MONTH_COUNT = 12;
const DEFAULT_MONTH_INCREMENT = 6;
const DEFAULT_MAX_MONTH_COUNT = 60;
const BOTTOM_THRESHOLD_PX = 300;

interface DateRangePickerSheetProps {
  open: boolean;
  value: DateRangeTypes;
  title?: string;
  minDate?: Date;
  monthCount?: number;
  monthIncrement?: number;
  maxMonthCount?: number;
  className?: string;
  onClose: () => void;
  onConfirm: (value: DateRangeTypes) => void;
}

type DateRangePickerContentProps = Omit<DateRangePickerSheetProps, 'open'>;

const DateRangePickerContent = ({
  value,
  title = '출발일/도착일을 선택해 주세요',
  minDate,
  monthCount = DEFAULT_MONTH_COUNT,
  monthIncrement = DEFAULT_MONTH_INCREMENT,
  maxMonthCount = DEFAULT_MAX_MONTH_COUNT,
  className,
  onClose,
  onConfirm,
}: DateRangePickerContentProps) => {
  const titleId = useId();
  const [draftValue, setDraftValue] = useState(value);
  const draftValueRef = useRef(value);
  const minSelectableDate = useMemo(
    () => getStartOfDay(minDate ?? new Date()),
    [minDate],
  );
  const initialMonthCount = Math.max(1, monthCount);
  const monthLoadCount = Math.max(1, monthIncrement);
  const monthLimit = Math.max(initialMonthCount, maxMonthCount);
  const [visibleMonthCount, setVisibleMonthCount] = useState(initialMonthCount);
  const renderedMonthCount = Math.max(initialMonthCount, visibleMonthCount);
  const months = useMemo(
    () => createMonths(minSelectableDate, renderedMonthCount),
    [minSelectableDate, renderedMonthCount],
  );
  const canConfirm = Boolean(draftValue.startDate && draftValue.endDate);

  const handleDateSelect = (date: Date) => {
    const selectedDate = getStartOfDay(date);
    const nextValue = getNextDateRange(selectedDate, draftValueRef.current);

    draftValueRef.current = nextValue;
    setDraftValue(nextValue);
  };

  const handleCalendarScroll = (event: UIEvent<HTMLDivElement>) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
    const isNearBottom =
      scrollTop + clientHeight >= scrollHeight - BOTTOM_THRESHOLD_PX;

    if (!isNearBottom) {
      return;
    }

    setVisibleMonthCount((prev) => {
      if (prev >= monthLimit) {
        return prev;
      }

      return Math.min(prev + monthLoadCount, monthLimit);
    });
  };

  const handleConfirmClick = () => {
    if (!canConfirm) {
      return;
    }

    onConfirm(draftValue);
  };

  return (
    <BottomSheet
      ariaLabelledBy={titleId}
      className={cn('flex h-[67.1dvh] flex-col', className)}
      open
      onClose={onClose}
    >
      <header className="flex h-15 shrink-0 items-start justify-between gap-3 border-b border-gray-200 px-4 pb-4 pl-5">
        <h2
          className="text-title-b-20 truncate pt-2.5 text-center text-gray-800"
          id={titleId}
        >
          {title}
        </h2>
        <button
          aria-label="날짜 선택 닫기"
          className="focus-visible:outline-mint-300 flex size-11 shrink-0 items-center justify-center rounded-full text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
          type="button"
          onClick={onClose}
        >
          <XIcon width={24} height={24} />
        </button>
      </header>
      <div
        className="scrollbar-width:none flex min-h-0 flex-1 flex-col gap-10 overflow-y-auto px-4 py-6 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleCalendarScroll}
      >
        {months.map((month) => (
          <CalendarMonth
            key={`${month.getFullYear()}-${month.getMonth()}`}
            month={month}
            value={draftValue}
            minDate={minSelectableDate}
            onSelect={handleDateSelect}
          />
        ))}
      </div>
      <footer className="shrink-0 bg-white px-4 pt-3 pb-6">
        <Button disabled={!canConfirm} onClick={handleConfirmClick}>
          선택 완료
        </Button>
      </footer>
    </BottomSheet>
  );
};

export const DateRangePickerSheet = ({
  open,
  ...props
}: DateRangePickerSheetProps) => {
  if (!open) {
    return null;
  }

  return <DateRangePickerContent {...props} />;
};

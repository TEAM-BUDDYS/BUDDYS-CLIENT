'use client';

import { type UIEvent, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@lib/cn';
import { XIcon } from '@shared/components/icons';

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

  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKeyDown);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, [onClose]);

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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
      <section
        aria-modal="true"
        aria-labelledby="date-range-picker-title"
        className={cn(
          'flex h-[67.1dvh] max-h-[calc(100dvh-24px)] w-full max-w-93.75 flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_4px_2px_0_rgba(0,0,0,0.25)]',
          className,
        )}
        role="dialog"
      >
        <header className="flex shrink-0 flex-col items-center gap-4 border-b border-gray-200 px-4 pt-2 pb-4">
          <div className="h-1.25 w-10 rounded-full bg-gray-100" />
          <div className="flex h-11 w-full items-center justify-between gap-3 pl-1">
            <h2
              className="text-title-b-20 truncate text-center text-gray-800"
              id="date-range-picker-title"
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
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col">
          <div
            className="flex min-h-0 flex-1 flex-col gap-10 overflow-y-auto px-4 py-6"
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
            <button
              className={cn(
                'text-body-sb-16 flex h-13 w-full items-center justify-center rounded-xl px-2.5 py-3 text-center text-white transition-colors',
                canConfirm ? 'bg-mint-300' : 'bg-gray-200',
              )}
              disabled={!canConfirm}
              type="button"
              onClick={handleConfirmClick}
            >
              선택 완료
            </button>
          </footer>
        </div>
      </section>
    </div>
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

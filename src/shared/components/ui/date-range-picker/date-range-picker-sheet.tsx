'use client';

import {
  type UIEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/cn';
import { XIcon } from '@/shared/components/icons';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet/bottom-sheet';
import { Button } from '@/shared/components/ui/button/button';

import { CalendarMonth } from './calendar-month';
import {
  checkBeforeDate,
  createMonths,
  type DateRangeTypes,
  getDateRangeDayCount,
  getNextDateRange,
  getStartOfDay,
} from './date-utils';

const DEFAULT_MONTH_COUNT = 12;
const DEFAULT_MONTH_INCREMENT = 6;
const DEFAULT_MAX_MONTH_COUNT = 60;
const BOTTOM_THRESHOLD_PX = 300;

const getMonthOffset = (startDate: Date, targetDate: Date) => {
  return (
    (targetDate.getFullYear() - startDate.getFullYear()) * 12 +
    targetDate.getMonth() -
    startDate.getMonth()
  );
};

interface DateRangePickerSheetProps {
  open: boolean;
  value: DateRangeTypes;
  title?: string;
  minDate?: Date;
  maxRangeDays?: number;
  className?: string;
  onClose: () => void;
  onConfirm: (value: DateRangeTypes) => void;
  onRangeLimitExceeded?: () => void;
}

type DateRangePickerContentProps = Omit<DateRangePickerSheetProps, 'open'>;

const DateRangePickerContent = ({
  value,
  title = '출발일/도착일을 선택해 주세요',
  minDate,
  maxRangeDays,
  className,
  onClose,
  onConfirm,
  onRangeLimitExceeded,
}: DateRangePickerContentProps) => {
  const titleId = useId();
  const [draftValue, setDraftValue] = useState(value);
  const calendarScrollRef = useRef<HTMLDivElement>(null);
  const initialMonthRef = useRef<HTMLDivElement>(null);
  const calendarAnchorDate = useMemo(() => getStartOfDay(new Date()), []);
  const minSelectableDate = useMemo(
    () => getStartOfDay(minDate ?? calendarAnchorDate),
    [calendarAnchorDate, minDate],
  );
  const renderedPastMonthCount = Math.max(
    0,
    getMonthOffset(minSelectableDate, calendarAnchorDate),
  );
  const initialVisibleDate = useMemo(
    () =>
      value.startDate && !checkBeforeDate(value.startDate, minSelectableDate)
        ? getStartOfDay(value.startDate)
        : checkBeforeDate(calendarAnchorDate, minSelectableDate)
          ? minSelectableDate
          : calendarAnchorDate,
    [calendarAnchorDate, minSelectableDate, value.startDate],
  );
  const initialMonthOffset = Math.max(
    0,
    getMonthOffset(minSelectableDate, initialVisibleDate),
  );
  const initialFutureMonthOffset = Math.max(
    0,
    getMonthOffset(calendarAnchorDate, initialVisibleDate),
  );
  const initialVisibleMonthCount = Math.max(
    DEFAULT_MONTH_COUNT,
    initialFutureMonthOffset + DEFAULT_MONTH_COUNT,
  );
  const maxVisibleMonthCount = Math.max(
    DEFAULT_MAX_MONTH_COUNT,
    initialVisibleMonthCount,
  );
  const [visibleMonthCount, setVisibleMonthCount] = useState(
    initialVisibleMonthCount,
  );
  const months = useMemo(
    () =>
      createMonths(
        minSelectableDate,
        renderedPastMonthCount + visibleMonthCount,
      ),
    [minSelectableDate, renderedPastMonthCount, visibleMonthCount],
  );
  const canConfirm = Boolean(draftValue.startDate);

  useEffect(() => {
    if (initialMonthOffset === 0) {
      return;
    }

    const animationFrameId = requestAnimationFrame(() => {
      const scrollContainer = calendarScrollRef.current;
      const initialMonth = initialMonthRef.current;

      if (!scrollContainer || !initialMonth) {
        return;
      }

      const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
      const initialMonthTop = initialMonth.getBoundingClientRect().top;

      scrollContainer.scrollTop += initialMonthTop - scrollContainerTop;
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, [initialMonthOffset]);

  const handleDateSelect = (date: Date) => {
    const selectedDate = getStartOfDay(date);
    const nextValue = getNextDateRange(selectedDate, draftValue);

    if (
      maxRangeDays &&
      nextValue.startDate &&
      nextValue.endDate &&
      getDateRangeDayCount(nextValue.startDate, nextValue.endDate) >
        maxRangeDays
    ) {
      onRangeLimitExceeded?.();
      return;
    }

    setDraftValue(nextValue);
  };

  const handleCalendarScroll = (event: UIEvent<HTMLDivElement>) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
    if (scrollTop + clientHeight < scrollHeight - BOTTOM_THRESHOLD_PX) {
      return;
    }

    setVisibleMonthCount((currentCount) =>
      Math.min(currentCount + DEFAULT_MONTH_INCREMENT, maxVisibleMonthCount),
    );
  };

  const handleConfirmClick = () => {
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
        ref={calendarScrollRef}
        className="scrollbar-width:none flex min-h-0 flex-1 flex-col gap-10 overflow-y-auto px-4 py-6 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleCalendarScroll}
      >
        {months.map((month) => {
          const isInitialMonth =
            month.getFullYear() === initialVisibleDate.getFullYear() &&
            month.getMonth() === initialVisibleDate.getMonth();

          return (
            <div
              key={`${month.getFullYear()}-${month.getMonth()}`}
              ref={isInitialMonth ? initialMonthRef : undefined}
            >
              <CalendarMonth
                month={month}
                value={draftValue}
                minDate={minSelectableDate}
                onSelect={handleDateSelect}
              />
            </div>
          );
        })}
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

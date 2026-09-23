'use client';

import { useMemo } from 'react';

import {
  DateRangePickerSheet,
  type DateRangeTypes,
  DateSelectButton,
  useToast,
} from '@/shared/components/ui';

import {
  COURSE_CREATE_MAX_DATE_RANGE_DAYS,
  COURSE_CREATE_PAST_YEAR_COUNT,
} from './constants';

interface CourseCreateDateStepProps {
  dateRange: DateRangeTypes;
  isDatePickerOpen: boolean;
  onDateClick: () => void;
  onDatePickerClose: () => void;
  onDateConfirm: (value: DateRangeTypes) => void;
}

export const CourseCreateDateStep = ({
  dateRange,
  isDatePickerOpen,
  onDateClick,
  onDatePickerClose,
  onDateConfirm,
}: CourseCreateDateStepProps) => {
  const { showToast } = useToast();
  const minSelectableDate = useMemo(() => {
    const today = new Date();

    return new Date(
      today.getFullYear() - COURSE_CREATE_PAST_YEAR_COUNT,
      today.getMonth(),
      1,
    );
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-body-sb-15 text-gray-800">일정 선택</span>
      <DateSelectButton
        className="w-fit"
        dateRange={dateRange}
        onClick={onDateClick}
      />
      <DateRangePickerSheet
        maxRangeDays={COURSE_CREATE_MAX_DATE_RANGE_DAYS}
        minDate={minSelectableDate}
        open={isDatePickerOpen}
        value={dateRange}
        onClose={onDatePickerClose}
        onConfirm={onDateConfirm}
        onRangeLimitExceeded={() =>
          showToast('코스 일정은 최대 30일까지 추가할 수 있어요', {
            bottomOffsetClassName: 'bottom-22.5',
            variant: 'gray',
          })
        }
      />
    </div>
  );
};

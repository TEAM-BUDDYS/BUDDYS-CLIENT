'use client';

import {
  DateRangePickerSheet,
  type DateRangeTypes,
  DateSelectButton,
} from '@/shared/components/ui';

interface PostCreateDateStepProps {
  dateRange: DateRangeTypes;
  isDatePickerOpen: boolean;
  onDateClick: () => void;
  onDatePickerClose: () => void;
  onDateConfirm: (value: DateRangeTypes) => void;
}

export const PostCreateDateStep = ({
  dateRange,
  isDatePickerOpen,
  onDateClick,
  onDatePickerClose,
  onDateConfirm,
}: PostCreateDateStepProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-body-sb-15 text-gray-800">일정 선택</span>
      <DateSelectButton
        className="w-fit"
        dateRange={dateRange}
        onClick={onDateClick}
      />
      <DateRangePickerSheet
        open={isDatePickerOpen}
        value={dateRange}
        onClose={onDatePickerClose}
        onConfirm={onDateConfirm}
      />
    </div>
  );
};

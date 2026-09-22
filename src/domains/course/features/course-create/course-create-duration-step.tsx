'use client';

import { useState } from 'react';

import { DateSelectButton } from '@/shared/components/ui';

import { CourseDurationPickerSheet } from './course-duration-picker-sheet';

interface CourseCreateDurationStepProps {
  durationDays: number | null;
  onConfirm: (durationDays: number) => void;
}

export const CourseCreateDurationStep = ({
  durationDays,
  onConfirm,
}: CourseCreateDurationStepProps) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const label =
    durationDays === null
      ? 'Day 수'
      : durationDays === 1
        ? '당일치기'
        : `${durationDays - 1}박 ${durationDays}일`;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-body-sb-15 text-gray-800">기간 선택</span>
      <DateSelectButton
        aria-label={`기간 선택: ${label}`}
        aria-haspopup="dialog"
        aria-expanded={isPickerOpen}
        className="w-fit"
        label={label}
        onClick={() => setIsPickerOpen(true)}
      />
      <CourseDurationPickerSheet
        open={isPickerOpen}
        value={durationDays}
        onClose={() => setIsPickerOpen(false)}
        onConfirm={(value) => {
          onConfirm(value);
          setIsPickerOpen(false);
        }}
      />
    </div>
  );
};

'use client';

import { useId, useState } from 'react';

import { MinusIcon, PlusIcon, XIcon } from '@/shared/components/icons';
import { BottomSheet, Button } from '@/shared/components/ui';

import {
  COURSE_CREATE_MAX_DATE_RANGE_DAYS,
  COURSE_CREATE_MIN_DURATION_DAYS,
} from './constants';

interface CourseDurationPickerSheetProps {
  open: boolean;
  value: number | null;
  onClose: () => void;
  onConfirm: (durationDays: number) => void;
}

const stepperButtonClassName =
  'group flex size-10 shrink-0 items-center justify-center rounded-full border border-mint-200 bg-mint-50 text-mint-300 enabled:active:border-mint-300 enabled:active:bg-mint-300 enabled:active:text-white disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-300';

const CourseDurationPickerContent = ({
  value,
  onClose,
  onConfirm,
}: Omit<CourseDurationPickerSheetProps, 'open'>) => {
  const titleId = useId();
  const [draftDays, setDraftDays] = useState(
    value ?? COURSE_CREATE_MIN_DURATION_DAYS,
  );

  return (
    <BottomSheet open ariaLabelledBy={titleId} onClose={onClose}>
      <header className="flex h-17 items-center justify-between border-b border-gray-200 pr-4 pb-4 pl-5">
        <h2 id={titleId} className="text-title-b-20 text-gray-800">
          Day 수를 선택해주세요
        </h2>
        <button
          type="button"
          aria-label="기간 선택 닫기"
          className="focus-visible:outline-mint-300 flex size-11 items-center justify-center rounded-full text-gray-200 focus-visible:outline-2"
          onClick={onClose}
        >
          <XIcon className="size-6" />
        </button>
      </header>
      <div className="my-6 flex h-30 flex-col items-center justify-center gap-4 px-4">
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="기간 하루 줄이기"
            disabled={draftDays <= COURSE_CREATE_MIN_DURATION_DAYS}
            className={stepperButtonClassName}
            onClick={() =>
              setDraftDays((days) =>
                Math.max(COURSE_CREATE_MIN_DURATION_DAYS, days - 1),
              )
            }
          >
            <MinusIcon className="size-5.5" />
          </button>
          <span
            className="text-title-b-28 text-gray-800 tabular-nums"
            aria-live="polite"
            aria-atomic="true"
          >
            {draftDays}일
          </span>
          <button
            type="button"
            aria-label="기간 하루 늘리기"
            disabled={draftDays >= COURSE_CREATE_MAX_DATE_RANGE_DAYS}
            className={stepperButtonClassName}
            onClick={() =>
              setDraftDays((days) =>
                Math.min(COURSE_CREATE_MAX_DATE_RANGE_DAYS, days + 1),
              )
            }
          >
            <PlusIcon className="size-5.5" />
          </button>
        </div>
        <p className="text-body-m-15 text-gray-500">
          당일치기(1일)부터 선택할 수 있어요
        </p>
      </div>
      <footer className="px-4 pb-8.5">
        <Button onClick={() => onConfirm(draftDays)}>선택 완료</Button>
      </footer>
    </BottomSheet>
  );
};

export const CourseDurationPickerSheet = ({
  open,
  ...props
}: CourseDurationPickerSheetProps) => {
  if (!open) {
    return null;
  }

  return <CourseDurationPickerContent {...props} />;
};

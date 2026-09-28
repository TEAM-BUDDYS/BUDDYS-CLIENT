'use client';

import { useState } from 'react';

import { CourseDayHeader } from '@/domains/course/components/course-day-header/course-day-header';
import { CourseDayMemoCost } from '@/domains/course/components/course-day-memo-cost/course-day-memo-cost';
import { CoursePlaceTimeline } from '@/domains/course/components/course-place-timeline/course-place-timeline';
import { cn } from '@/lib/cn';

import type { CourseCreateDayFormState } from '../model';
import { CourseCreateDayImageField } from './course-create-day-image-field';
import { CourseCreateMemoCostSheet } from './course-create-memo-cost-sheet';

interface CourseCreateDaySectionProps {
  day: CourseCreateDayFormState;
  isLast: boolean;
  onPlaceAdd: (dayNumber: number) => void;
  onImagesAdd: (dayNumber: number, files: File[]) => void;
  onImageRemove: (dayNumber: number, previewUrl: string) => void;
  onMemoCostChange: (
    dayNumber: number,
    value: Pick<CourseCreateDayFormState, 'memo' | 'cost'>,
  ) => void;
}

export const CourseCreateDaySection = ({
  day,
  isLast,
  onPlaceAdd,
  onImagesAdd,
  onImageRemove,
  onMemoCostChange,
}: CourseCreateDaySectionProps) => {
  const [isMemoCostSheetOpen, setIsMemoCostSheetOpen] = useState(false);
  const hasMemoOrCost = Boolean(day.memo || day.cost !== null);
  const headingId = `course-day-${day.dayNumber}-title`;

  return (
    <section
      className={cn(
        'flex flex-col gap-8 py-10',
        !isLast && 'border-b border-gray-100',
      )}
      aria-labelledby={headingId}
    >
      <div className="flex flex-col gap-3">
        <CourseDayHeader
          id={headingId}
          dayNumber={day.dayNumber}
          date={day.date ?? null}
        />

        <div className="grid grid-cols-2 gap-4">
          <button
            className="text-body-sb-14 bg-mint-300 active:bg-mint-400 h-12 rounded-lg text-white"
            type="button"
            onClick={() => onPlaceAdd(day.dayNumber)}
          >
            장소 추가
          </button>
          <button
            className={cn(
              'text-body-sb-14 h-12 rounded-lg bg-gray-50 text-gray-500 active:bg-gray-100',
              hasMemoOrCost && 'border-mint-200 text-mint-300 border bg-white',
            )}
            type="button"
            onClick={() => setIsMemoCostSheetOpen(true)}
          >
            메모 / 비용 추가
          </button>
        </div>
      </div>

      <CourseCreateDayImageField
        dayNumber={day.dayNumber}
        images={day.images}
        onImagesAdd={onImagesAdd}
        onImageRemove={onImageRemove}
      />

      <CoursePlaceTimeline places={day.places} tone="accent" />

      <CourseDayMemoCost memo={day.memo || null} cost={day.cost} />

      {isMemoCostSheetOpen && (
        <CourseCreateMemoCostSheet
          dayNumber={day.dayNumber}
          memo={day.memo}
          cost={day.cost}
          onClose={() => setIsMemoCostSheetOpen(false)}
          onConfirm={(value) => onMemoCostChange(day.dayNumber, value)}
        />
      )}
    </section>
  );
};

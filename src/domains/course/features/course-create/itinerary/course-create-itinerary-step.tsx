'use client';

import { useState } from 'react';

import type { CourseMapCenter } from '@/domains/course/model/course-map';

import type { CourseCreateDayFormState } from '../model';
import { CourseCreateDaySection } from './course-create-day-section';
import { CourseCreatePlacePicker } from './course-create-place-picker';

interface CourseCreateItineraryStepProps {
  title: string;
  days: CourseCreateDayFormState[];
  placeMapCenter?: CourseMapCenter | null;
  recentPlaces: CourseCreateDayFormState['places'];
  onDayPlacesChange: (
    dayNumber: number,
    places: CourseCreateDayFormState['places'],
  ) => void;
  onDayImagesAdd: (dayNumber: number, files: File[]) => void;
  onDayImageRemove: (dayNumber: number, previewUrl: string) => void;
  onDayMemoCostChange: (
    dayNumber: number,
    value: Pick<CourseCreateDayFormState, 'memo' | 'cost'>,
  ) => void;
}

export const CourseCreateItineraryStep = ({
  title,
  days,
  placeMapCenter = null,
  recentPlaces,
  onDayPlacesChange,
  onDayImagesAdd,
  onDayImageRemove,
  onDayMemoCostChange,
}: CourseCreateItineraryStepProps) => {
  const [placePickerDayNumber, setPlacePickerDayNumber] = useState<
    number | null
  >(null);
  const placePickerDay = days.find(
    ({ dayNumber }) => dayNumber === placePickerDayNumber,
  );

  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-body-sb-14 text-gray-200">
          버디님의 코스를 정리해주세요
        </p>
        <h1 className="text-title-b-20 truncate text-gray-800">{title}</h1>
      </div>

      <div className="flex flex-col">
        {days.map((day, index) => (
          <CourseCreateDaySection
            key={day.dayNumber}
            day={day}
            isLast={index === days.length - 1}
            onPlaceAdd={setPlacePickerDayNumber}
            onImagesAdd={onDayImagesAdd}
            onImageRemove={onDayImageRemove}
            onMemoCostChange={onDayMemoCostChange}
          />
        ))}
      </div>

      {placePickerDay && (
        <CourseCreatePlacePicker
          dayNumber={placePickerDay.dayNumber}
          mapCenter={placeMapCenter}
          recentPlaces={recentPlaces}
          selectedPlaces={placePickerDay.places}
          onClose={() => setPlacePickerDayNumber(null)}
          onConfirm={(places) =>
            onDayPlacesChange(placePickerDay.dayNumber, places)
          }
        />
      )}
    </>
  );
};

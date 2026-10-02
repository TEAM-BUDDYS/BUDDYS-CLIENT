'use client';

import { useState } from 'react';

import { CourseDayPickerSheet } from '@/domains/course/components/course-day-picker-sheet/course-day-picker-sheet';
import { PlusIcon } from '@/shared/components/icons';
import { useToast } from '@/shared/components/ui';

import { COURSE_CREATE_MAX_FLIGHT_COUNT } from '../constants';
import type {
  CourseCreateCityOption,
  CourseCreateDayFormState,
} from '../model';
import { CourseCreateDaySection } from './course-create-day-section';
import { CourseCreatePlacePicker } from './course-create-place-picker';

interface CourseCreateItineraryStepProps {
  title: string;
  cities: CourseCreateCityOption[];
  days: CourseCreateDayFormState[];
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
  onFlightDaySelect: (dayNumber: number) => void;
}

export const CourseCreateItineraryStep = ({
  title,
  cities,
  days,
  onDayPlacesChange,
  onDayImagesAdd,
  onDayImageRemove,
  onDayMemoCostChange,
  onFlightDaySelect,
}: CourseCreateItineraryStepProps) => {
  const { showToast } = useToast();
  const [placePickerDayNumber, setPlacePickerDayNumber] = useState<
    number | null
  >(null);
  const [isFlightDayPickerOpen, setIsFlightDayPickerOpen] = useState(false);
  const placePickerDay = days.find(
    ({ dayNumber }) => dayNumber === placePickerDayNumber,
  );
  const flightCount = days.reduce(
    (count, { flights }) => count + flights.length,
    0,
  );
  const isFlightLimitReached = flightCount >= COURSE_CREATE_MAX_FLIGHT_COUNT;

  const handleFlightAddClick = () => {
    if (isFlightLimitReached) {
      showToast('항공편은 최대 5개까지 추가할 수 있어요', {
        bottomOffsetClassName: 'bottom-8.5',
      });
      return;
    }

    setIsFlightDayPickerOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-body-sb-14 text-gray-200">
              버디님의 코스를 정리해주세요
            </p>
            <h1 className="text-title-b-20 truncate text-gray-800">{title}</h1>
          </div>

          <button
            aria-disabled={isFlightLimitReached}
            className="text-caption-m-12 flex h-8.5 w-[93px] items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white text-gray-800 aria-disabled:cursor-not-allowed aria-disabled:border-gray-50 aria-disabled:bg-gray-50 aria-disabled:text-gray-200"
            type="button"
            onClick={handleFlightAddClick}
          >
            <PlusIcon aria-hidden className="size-4" />
            {`항공편 ${flightCount}/${COURSE_CREATE_MAX_FLIGHT_COUNT}`}
          </button>
        </div>

        <div>
          {days.map((day, index) => (
            <CourseCreateDaySection
              key={day.dayNumber}
              day={day}
              isFirst={index === 0}
              isLast={index === days.length - 1}
              onPlaceAdd={setPlacePickerDayNumber}
              onImagesAdd={onDayImagesAdd}
              onImageRemove={onDayImageRemove}
              onMemoCostChange={onDayMemoCostChange}
            />
          ))}
        </div>
      </div>

      {placePickerDay && (
        <CourseCreatePlacePicker
          cities={cities}
          dayNumber={placePickerDay.dayNumber}
          selectedPlaces={placePickerDay.places}
          onClose={() => setPlacePickerDayNumber(null)}
          onConfirm={(places) =>
            onDayPlacesChange(placePickerDay.dayNumber, places)
          }
        />
      )}

      <CourseDayPickerSheet
        days={days}
        open={isFlightDayPickerOpen}
        selectedDayNumber={null}
        onClose={() => setIsFlightDayPickerOpen(false)}
        onDaySelect={onFlightDaySelect}
      />
    </>
  );
};

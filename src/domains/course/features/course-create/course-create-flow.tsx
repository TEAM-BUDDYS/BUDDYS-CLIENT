'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { CourseMapCenter } from '@/domains/course/model/course-map';
import { cn } from '@/lib/cn';
import { Header } from '@/shared/components/layout';
import {
  Button,
  type DateRangeTypes,
  ProgressBar,
} from '@/shared/components/ui';

import {
  COURSE_CREATE_PROGRESS_STEP_BY_SCREEN,
  COURSE_CREATE_QUESTION_CONTENT,
  COURSE_CREATE_TOTAL_STEP,
} from './constants';
import { CourseCreateCityStep } from './course-create-city-step';
import { CourseCreateCountryStep } from './course-create-country-step';
import { CourseCreateDateStep } from './course-create-date-step';
import { CourseCreateDetailStep } from './course-create-detail-step';
import { CourseCreateDurationStep } from './course-create-duration-step';
import { CourseCreateQuestionHeader } from './course-create-question-header';
import { CourseCreateFlightForm } from './flight/course-create-flight-form';
import { CourseCreateItineraryStep } from './itinerary/course-create-itinerary-step';
import type {
  CourseCreateDayFormState,
  CourseCreateScreen,
  CourseCreateValue,
} from './model';
import { useCourseCreateForm } from './use-course-create-form';

interface CourseCreateFlowProps {
  placeMapCenter?: CourseMapCenter | null;
  recentPlaces?: CourseCreateDayFormState['places'];
  onComplete?: (value: CourseCreateValue) => void;
}

export const CourseCreateFlow = ({
  placeMapCenter = null,
  recentPlaces = [],
  onComplete,
}: CourseCreateFlowProps) => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] =
    useState<CourseCreateScreen>('country');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [flightDayNumber, setFlightDayNumber] = useState<number | null>(null);
  const courseCreateForm = useCourseCreateForm();

  if (flightDayNumber !== null) {
    return (
      <CourseCreateFlightForm
        onBack={() => setFlightDayNumber(null)}
        onConfirm={(flight) => {
          courseCreateForm.addDayFlight(flightDayNumber, flight);
          setFlightDayNumber(null);
        }}
      />
    );
  }

  const currentProgressStep =
    COURSE_CREATE_PROGRESS_STEP_BY_SCREEN[currentScreen];
  const canGoNext = courseCreateForm.canGoNext(currentScreen);
  const isQuestionScreen =
    currentScreen !== 'detail' && currentScreen !== 'itinerary';

  const handleBackClick = () => {
    if (currentScreen === 'country') {
      router.back();
      return;
    }

    if (currentScreen === 'city') {
      setCurrentScreen('country');
      return;
    }

    if (currentScreen === 'date') {
      setCurrentScreen('city');
      return;
    }

    if (currentScreen === 'itinerary') {
      setCurrentScreen('detail');
      return;
    }

    setCurrentScreen(
      currentScreen === 'detail' && !courseCreateForm.dateRange.startDate
        ? 'duration'
        : 'date',
    );
  };

  const handleNextClick = () => {
    if (!canGoNext) {
      return;
    }

    if (currentScreen === 'country') {
      setCurrentScreen('city');
      return;
    }

    if (currentScreen === 'city') {
      setCurrentScreen('date');
      return;
    }

    if (currentScreen === 'date' || currentScreen === 'duration') {
      setCurrentScreen('detail');
      return;
    }

    if (currentScreen === 'detail') {
      courseCreateForm.initializeDays();
      setCurrentScreen('itinerary');
      return;
    }

    const courseCreateValue = courseCreateForm.getCourseCreateValue();

    if (courseCreateValue) {
      onComplete?.(courseCreateValue);
    }
  };

  const handleDateConfirm = (value: DateRangeTypes) => {
    courseCreateForm.handleDateRangeChange(value);
    setIsDatePickerOpen(false);
  };

  const handleDateSkipClick = () => {
    courseCreateForm.clearDateRange();
    setCurrentScreen('duration');
  };

  return (
    <main className="flex min-h-dvh flex-col bg-white">
      <div className="sticky top-0 z-20 bg-white">
        <Header
          content={
            <span className="text-title-b-18 text-gray-800">코스 작성하기</span>
          }
          contentAlign="center"
          hasBackButton
          onBackClick={handleBackClick}
        />
        <div className="px-4">
          <ProgressBar
            currentStep={currentProgressStep}
            totalStep={COURSE_CREATE_TOTAL_STEP}
          />
        </div>
      </div>

      <section
        className={cn(
          'flex flex-1 flex-col px-4',
          currentScreen === 'detail' || currentScreen === 'itinerary'
            ? 'pt-8'
            : 'pt-10',
        )}
      >
        <div
          className={cn(
            'flex flex-col',
            currentScreen === 'duration' ? 'gap-10' : 'gap-6',
          )}
        >
          {isQuestionScreen && (
            <CourseCreateQuestionHeader
              title={COURSE_CREATE_QUESTION_CONTENT[currentScreen].title}
              description={
                COURSE_CREATE_QUESTION_CONTENT[currentScreen].description
              }
            />
          )}

          {currentScreen === 'country' && (
            <CourseCreateCountryStep
              selectedCountries={courseCreateForm.selectedCountries}
              onCountrySelect={courseCreateForm.handleCountrySelect}
              onCountryRemove={courseCreateForm.handleCountryRemove}
            />
          )}

          {currentScreen === 'city' && (
            <CourseCreateCityStep
              countries={courseCreateForm.selectedCountries}
              selectedCities={courseCreateForm.selectedCities}
              onCitySelect={courseCreateForm.handleCitySelect}
              onCityRemove={courseCreateForm.handleCityRemove}
            />
          )}

          {currentScreen === 'date' && (
            <CourseCreateDateStep
              dateRange={courseCreateForm.dateRange}
              isDatePickerOpen={isDatePickerOpen}
              onDateClick={() => setIsDatePickerOpen(true)}
              onDatePickerClose={() => setIsDatePickerOpen(false)}
              onDateConfirm={handleDateConfirm}
            />
          )}

          {currentScreen === 'duration' && (
            <CourseCreateDurationStep
              durationDays={courseCreateForm.durationDays}
              onConfirm={courseCreateForm.handleDurationConfirm}
            />
          )}

          {currentScreen === 'detail' && (
            <CourseCreateDetailStep
              value={courseCreateForm.detail}
              onChange={courseCreateForm.updateDetail}
            />
          )}

          {currentScreen === 'itinerary' && (
            <CourseCreateItineraryStep
              title={courseCreateForm.detail.title}
              days={courseCreateForm.days}
              placeMapCenter={placeMapCenter}
              recentPlaces={recentPlaces}
              onDayPlacesChange={courseCreateForm.setDayPlaces}
              onDayImagesAdd={courseCreateForm.addDayImages}
              onDayImageRemove={courseCreateForm.removeDayImage}
              onDayMemoCostChange={courseCreateForm.updateDayMemoCost}
              onFlightDaySelect={setFlightDayNumber}
            />
          )}
        </div>
      </section>

      <div className="sticky bottom-0 mt-auto flex flex-col gap-4 bg-white px-4 pt-6 pb-8.5">
        <Button disabled={!canGoNext} onClick={handleNextClick}>
          다음
        </Button>
        {currentScreen === 'date' && (
          <button
            className="text-body-r-14 text-gray-500"
            type="button"
            onClick={handleDateSkipClick}
          >
            건너뛰기
          </button>
        )}
      </div>
    </main>
  );
};

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
import { CourseCreateQuestionHeader } from './course-create-question-header';
import type { CourseCreateBasicInfoValue, CourseCreateScreen } from './model';
import { useCourseCreateForm } from './use-course-create-form';

interface CourseCreateFlowProps {
  onBasicInfoComplete?: (value: CourseCreateBasicInfoValue) => void;
}

export const CourseCreateFlow = ({
  onBasicInfoComplete,
}: CourseCreateFlowProps) => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] =
    useState<CourseCreateScreen>('country');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const courseCreateForm = useCourseCreateForm();
  const currentProgressStep =
    COURSE_CREATE_PROGRESS_STEP_BY_SCREEN[currentScreen];
  const canGoNext = courseCreateForm.canGoNext(currentScreen);
  const isQuestionScreen = currentScreen !== 'detail';

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

    setCurrentScreen('date');
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

    if (currentScreen === 'date') {
      setCurrentScreen('detail');
      return;
    }

    const basicInfoValue = courseCreateForm.getBasicInfoValue();

    if (basicInfoValue) {
      onBasicInfoComplete?.(basicInfoValue);
    }
  };

  const handleDateConfirm = (value: DateRangeTypes) => {
    courseCreateForm.setDateRange(value);
    setIsDatePickerOpen(false);
  };

  const handleDateSkipClick = () => {
    courseCreateForm.clearDateRange();
    setCurrentScreen('detail');
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
          currentScreen === 'detail' ? 'pt-8' : 'pt-10',
        )}
      >
        <div className="flex flex-col gap-6">
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

          {currentScreen === 'detail' && (
            <CourseCreateDetailStep
              value={courseCreateForm.detail}
              onChange={courseCreateForm.updateDetail}
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

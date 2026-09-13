'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Header } from '@/shared/components/layout';
import { Button, ProgressBar } from '@/shared/components/ui';

import {
  COURSE_CREATE_LOCATION_STEP_CONTENT,
  COURSE_CREATE_TOTAL_STEP,
} from './constants';
import { CourseCreateCityStep } from './course-create-city-step';
import { CourseCreateCountryStep } from './course-create-country-step';
import { CourseCreateQuestionHeader } from './course-create-question-header';
import type {
  CourseCreateLocationStep,
  CourseCreateLocationValue,
} from './model';
import { useCourseCreateForm } from './use-course-create-form';

interface CourseCreateFlowProps {
  onLocationComplete?: (value: CourseCreateLocationValue) => void;
}

export const CourseCreateFlow = ({
  onLocationComplete,
}: CourseCreateFlowProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CourseCreateLocationStep>(1);
  const courseCreateForm = useCourseCreateForm();
  const stepContent = COURSE_CREATE_LOCATION_STEP_CONTENT[currentStep];
  const canGoNext =
    currentStep === 1
      ? courseCreateForm.selectedCountries.length > 0
      : courseCreateForm.selectedCities.length > 0;

  const handleBackClick = () => {
    if (currentStep === 1) {
      router.back();
      return;
    }

    setCurrentStep(1);
  };

  const handleNextClick = () => {
    if (!canGoNext) {
      return;
    }

    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    onLocationComplete?.(courseCreateForm.getLocationValue());
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
            currentStep={currentStep}
            totalStep={COURSE_CREATE_TOTAL_STEP}
          />
        </div>
      </div>

      <section className="flex flex-1 flex-col px-4 pt-10">
        <div className="flex flex-col gap-6">
          <CourseCreateQuestionHeader
            title={stepContent.title}
            description={stepContent.description}
          />

          {currentStep === 1 ? (
            <CourseCreateCountryStep
              selectedCountries={courseCreateForm.selectedCountries}
              onCountrySelect={courseCreateForm.handleCountrySelect}
              onCountryRemove={courseCreateForm.handleCountryRemove}
            />
          ) : (
            <CourseCreateCityStep
              countries={courseCreateForm.selectedCountries}
              selectedCities={courseCreateForm.selectedCities}
              onCitySelect={courseCreateForm.handleCitySelect}
              onCityRemove={courseCreateForm.handleCityRemove}
            />
          )}
        </div>
      </section>

      <div className="sticky bottom-0 mt-auto bg-white px-4 pt-6 pb-8.5">
        <Button disabled={!canGoNext} onClick={handleNextClick}>
          다음
        </Button>
      </div>
    </main>
  );
};

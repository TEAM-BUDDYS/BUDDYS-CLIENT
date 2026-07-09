'use client';

import { useState } from 'react';

import { Button, ProgressBar } from '@/shared/components/ui';

import { TOTAL_PROGRESS_STEP } from './constant';
import type { OnboardProgressStep, OnboardStep } from './model';
import { OnboardExchangeInfoStep } from './onboard-exchange-info-step';
import { OnboardInterestLocationStep } from './onboard-interest-location-step';
import { useOnboardForm } from './use-onboard-form';

const PROGRESS_STEP_BY_STEP = {
  'interest-location': 1,
  'exchange-info': 2,
} satisfies Partial<Record<OnboardStep, OnboardProgressStep>>;

const NEXT_STEP_BY_STEP = {
  'interest-location': 'exchange-info',
  'exchange-info': 'activity-type',
} satisfies Partial<Record<OnboardStep, OnboardStep>>;

export const OnboardFlow = () => {
  const [currentStep, setCurrentStep] =
    useState<OnboardStep>('interest-location');
  const onboardForm = useOnboardForm();
  const progressStep =
    PROGRESS_STEP_BY_STEP[currentStep as keyof typeof PROGRESS_STEP_BY_STEP];
  const canGoNext = onboardForm.canGoNext(currentStep);

  const handleNextClick = () => {
    if (!canGoNext) {
      return;
    }

    const nextStep =
      NEXT_STEP_BY_STEP[currentStep as keyof typeof NEXT_STEP_BY_STEP];

    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const handleSkipClick = () => {
    setCurrentStep('activity-type');
  };

  return (
    <main className="flex min-h-dvh w-full max-w-100 flex-col px-4 pt-7 pb-[34px]">
      {progressStep && (
        <ProgressBar
          currentStep={progressStep}
          totalStep={TOTAL_PROGRESS_STEP}
        />
      )}
      <section className="flex flex-1 flex-col pt-10">
        {currentStep === 'interest-location' && (
          <OnboardInterestLocationStep
            countryOptions={onboardForm.countryOptions}
            selectedCountry={onboardForm.interestCountry}
            city={onboardForm.interestCity}
            selectedCity={onboardForm.selectedInterestCity}
            cityResults={onboardForm.interestCityResults}
            onCountryChange={onboardForm.handleInterestCountrySelect}
            onCityChange={onboardForm.handleInterestCityChange}
            onCitySelect={onboardForm.handleInterestCitySelect}
          />
        )}

        {currentStep === 'exchange-info' && (
          <OnboardExchangeInfoStep
            countryOptions={onboardForm.countryOptions}
            selectedCountry={onboardForm.exchangeCountry}
            school={onboardForm.exchangeSchool}
            selectedSchool={onboardForm.selectedExchangeSchool}
            schoolResults={onboardForm.exchangeSchoolResults}
            startMonth={onboardForm.startMonth}
            endMonth={onboardForm.endMonth}
            onCountryChange={onboardForm.handleExchangeCountrySelect}
            onSchoolChange={onboardForm.handleExchangeSchoolChange}
            onSchoolSelect={onboardForm.handleExchangeSchoolSelect}
            onStartMonthChange={onboardForm.handleStartMonthChange}
            onEndMonthChange={onboardForm.handleEndMonthChange}
          />
        )}

        {currentStep === 'activity-type' && <p>구현중</p>}
      </section>

      <div className="flex flex-col gap-4">
        <Button disabled={!canGoNext} onClick={handleNextClick}>
          다음
        </Button>
        {currentStep === 'exchange-info' && (
          <button
            className="text-body-r-14 text-gray-500"
            type="button"
            onClick={handleSkipClick}
          >
            건너뛰기
          </button>
        )}
      </div>
    </main>
  );
};

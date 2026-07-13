'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, ProgressBar } from '@/shared/components/ui';
import {
  ACTIVITY_TAGS,
  COMPANION_STYLE_TAGS,
  INTEREST_TAGS,
} from '@/shared/constants/preference-tags';

import type { OnboardProgressStep, OnboardStep } from '../../model/onboard';
import { RECOMMENDED_PROFILE, TOTAL_PROGRESS_STEP } from './constant';
import { OnboardComplete } from './onboard-complete';
import { OnboardExchangeInfoStep } from './onboard-exchange-info-step';
import { OnboardInterestLocationStep } from './onboard-interest-location-step';
import { OnboardProfileStep } from './onboard-profile-step';
import { OnboardTagSelectStep } from './onboard-tag-select-step';
import { useOnboardForm } from './use-onboard-form';

const PROGRESS_STEP_BY_STEP = {
  'interest-location': 1,
  'exchange-info': 2,
  'activity-tags': 3,
  'interest-tags': 4,
  'companion-tags': 5,
} satisfies Partial<Record<OnboardStep, OnboardProgressStep>>;

const NEXT_STEP_BY_STEP = {
  'interest-location': 'exchange-info',
  'exchange-info': 'activity-tags',
  'activity-tags': 'interest-tags',
  'interest-tags': 'companion-tags',
  'companion-tags': 'profile',
  profile: 'complete',
} satisfies Partial<Record<OnboardStep, OnboardStep>>;

export const OnboardFlow = () => {
  const [currentStep, setCurrentStep] =
    useState<OnboardStep>('interest-location');
  const onboardForm = useOnboardForm();
  const progressStep =
    PROGRESS_STEP_BY_STEP[currentStep as keyof typeof PROGRESS_STEP_BY_STEP];
  const canGoNext = onboardForm.canGoNext(currentStep);

  const router = useRouter();

  const handleNextClick = () => {
    if (!canGoNext) {
      return;
    }

    if (currentStep === 'profile') {
      // TODO: 이미지 업로드 및 온보딩 등록 API 성공 시 complete 단계로 이동
      setCurrentStep('complete');
      return;
    }

    const nextStep =
      NEXT_STEP_BY_STEP[currentStep as keyof typeof NEXT_STEP_BY_STEP];

    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const handleSkipClick = () => {
    onboardForm.resetExchangeInfo();
    setCurrentStep('activity-tags');
  };

  return (
    <main className="flex min-h-dvh w-full flex-col px-4 pt-7 pb-[34px]">
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

        {currentStep === 'activity-tags' && (
          <OnboardTagSelectStep
            title="어떤 활동을 함께하고 싶나요?"
            description="원하는 동행 유형을 추천해드릴게요"
            tags={ACTIVITY_TAGS}
            selectedTagIds={onboardForm.activityTagIds}
            maxSelectionCount={3}
            onChange={onboardForm.handleActivityTagIdsChange}
          />
        )}

        {currentStep === 'interest-tags' && (
          <OnboardTagSelectStep
            title="관심사를 선택해주세요"
            description="취향이 비슷한 사람을 연결해드릴게요"
            tags={INTEREST_TAGS}
            selectedTagIds={onboardForm.interestTagIds}
            maxSelectionCount={3}
            onChange={onboardForm.handleInterestTagIdsChange}
          />
        )}

        {currentStep === 'companion-tags' && (
          <OnboardTagSelectStep
            title="동행 스타일은요?"
            description="함께할 사람의 성향을 맞춰볼게요 "
            tags={COMPANION_STYLE_TAGS}
            selectedTagIds={onboardForm.companionTagIds}
            maxSelectionCount={5}
            onChange={onboardForm.handleCompanionTagIdsChange}
          />
        )}

        {currentStep === 'profile' && (
          <OnboardProfileStep
            nickname={onboardForm.nickname}
            gender={onboardForm.gender}
            birthDate={onboardForm.birthDate}
            bio={onboardForm.bio}
            profileImageFile={onboardForm.profileImageFile}
            onNicknameChange={onboardForm.handleNicknameChange}
            onGenderChange={onboardForm.handleGenderChange}
            onBirthDateChange={onboardForm.handleBirthDateChange}
            onBioChange={onboardForm.handleBioChange}
            onProfileImageChange={onboardForm.handleProfileImageChange}
          />
        )}

        {currentStep === 'complete' && (
          <>
            <OnboardComplete
              nickname={onboardForm.nickname}
              otherNickname={RECOMMENDED_PROFILE.nickname}
              similarityScore={RECOMMENDED_PROFILE.similarityScore}
            />
            <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-100 -translate-x-1/2 px-4 pb-[34px]">
              <div className="absolute right-0 bottom-0 left-0 -z-10 h-[145px] bg-gradient-to-b from-white/0 via-white to-white" />
              <Button onClick={() => router.push('/')} className="w-full">
                시작하기
              </Button>
            </div>
          </>
        )}
      </section>

      {currentStep !== 'complete' && (
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
      )}
    </main>
  );
};

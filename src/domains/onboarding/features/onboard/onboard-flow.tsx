'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useCountryList } from '@/shared/api';
import { TAG_QUERY_OPTIONS } from '@/shared/api';
import { useImageUpload } from '@/shared/api/image';
import { Button, ProgressBar, useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import type { OnboardProgressStep, OnboardStep } from '../../model/onboard';
import {
  RECOMMENDED_POSTS,
  RECOMMENDED_PROFILE,
  TOTAL_PROGRESS_STEP,
} from './constant';
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

const ONBOARD_TAG_TYPES = ['ACTIVITY', 'INTEREST', 'TRAVEL_STYLE'] as const;

export const OnboardFlow = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { isUploading, uploadImage } = useImageUpload();
  const [currentStep, setCurrentStep] =
    useState<OnboardStep>('interest-location');
  const onboardForm = useOnboardForm();
  const progressStep =
    PROGRESS_STEP_BY_STEP[currentStep as keyof typeof PROGRESS_STEP_BY_STEP];
  const canGoNext = onboardForm.canGoNext(currentStep);

  const router = useRouter();
  const {
    countryOptions,
    hasMoreCountries,
    isLoadingMoreCountries,
    loadMoreCountries,
  } = useCountryList();

  useEffect(() => {
    ONBOARD_TAG_TYPES.forEach((tagType) => {
      void queryClient.prefetchQuery(TAG_QUERY_OPTIONS.LIST(tagType));
    });
  }, [queryClient]);

  const handleProfileImageUpload = async () => {
    try {
      if (onboardForm.profileImageFile) {
        await uploadImage({
          file: onboardForm.profileImageFile,
          imageDomain: 'PROFILE',
        });
      }

      setCurrentStep('complete');
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : '프로필 이미지를 업로드하지 못했습니다.',
        {
          bottomOffsetClassName: 'bottom-26.5',
          variant: 'gray',
        },
      );
    }
  };

  const handleNextClick = () => {
    if (!canGoNext || isUploading) {
      return;
    }

    if (currentStep === 'profile') {
      void handleProfileImageUpload();
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
            countryOptions={countryOptions}
            selectedCountry={onboardForm.interestCountry}
            hasMoreCountries={hasMoreCountries}
            isLoadingMoreCountries={isLoadingMoreCountries}
            city={onboardForm.interestCity}
            selectedCity={onboardForm.selectedInterestCity}
            cityResults={onboardForm.interestCityResults}
            onCountryChange={onboardForm.handleInterestCountrySelect}
            onLoadMoreCountries={loadMoreCountries}
            onCityChange={onboardForm.handleInterestCityChange}
            onCitySelect={onboardForm.handleInterestCitySelect}
          />
        )}

        {currentStep === 'exchange-info' && (
          <OnboardExchangeInfoStep
            countryOptions={countryOptions}
            selectedCountry={onboardForm.exchangeCountry}
            hasMoreCountries={hasMoreCountries}
            isLoadingMoreCountries={isLoadingMoreCountries}
            school={onboardForm.exchangeSchool}
            selectedSchool={onboardForm.selectedExchangeSchool}
            schoolResults={onboardForm.exchangeSchoolResults}
            startMonth={onboardForm.startMonth}
            endMonth={onboardForm.endMonth}
            onCountryChange={onboardForm.handleExchangeCountrySelect}
            onLoadMoreCountries={loadMoreCountries}
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
            tagType="ACTIVITY"
            selectedTagIds={onboardForm.activityTagIds}
            maxSelectionCount={3}
            onChange={onboardForm.handleActivityTagIdsChange}
          />
        )}

        {currentStep === 'interest-tags' && (
          <OnboardTagSelectStep
            title="관심사를 선택해주세요"
            description="취향이 비슷한 사람을 연결해드릴게요"
            tagType="INTEREST"
            selectedTagIds={onboardForm.interestTagIds}
            maxSelectionCount={3}
            onChange={onboardForm.handleInterestTagIdsChange}
          />
        )}

        {currentStep === 'companion-tags' && (
          <OnboardTagSelectStep
            title="동행 스타일은요?"
            description="함께할 사람의 성향을 맞춰볼게요 "
            tagType="TRAVEL_STYLE"
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
            isUploading={isUploading}
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
              recommendedPosts={RECOMMENDED_POSTS}
            />
            <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-100 -translate-x-1/2 px-4 pb-[34px]">
              <div className="absolute right-0 bottom-0 left-0 -z-10 h-[145px] bg-gradient-to-b from-white/0 via-white to-white" />
              <Button
                onClick={() => router.push(ROUTES.HOME)}
                className="w-full"
              >
                시작하기
              </Button>
            </div>
          </>
        )}
      </section>

      {currentStep !== 'complete' && (
        <div className="flex flex-col gap-4">
          <Button
            disabled={!canGoNext || isUploading}
            onClick={handleNextClick}
          >
            {isUploading ? '업로드 중...' : '다음'}
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

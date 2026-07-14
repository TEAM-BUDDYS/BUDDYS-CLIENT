'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { POST_MUTATION_OPTIONS } from '@/domains/posts/api/query';
import { cn } from '@/lib/cn';
import { POST_QUERY_KEY, useCitySearch, useCountryList } from '@/shared/api';
import { Header } from '@/shared/components/layout';
import {
  Button,
  type DateRangeTypes,
  ProgressBar,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { STEP_CONTENTS, TOTAL_STEP } from './constants';
import type { PostCreateQuestionStep, PostCreateStep } from './model';
import { PostCreateCityStep } from './post-create-city-step';
import { PostCreateCountryStep } from './post-create-country-step';
import { PostCreateDateStep } from './post-create-date-step';
import { PostCreateDetailStep } from './post-create-detail-step';
import { PostCreateQuestionHeader } from './post-create-question-header';
import { usePostCreateForm } from './use-post-create-form';

const PREVIOUS_STEP_BY_STEP = {
  1: 1,
  2: 1,
  3: 2,
  4: 3,
} satisfies Record<PostCreateStep, PostCreateStep>;

const NEXT_STEP_BY_STEP = {
  1: 2,
  2: 3,
  3: 4,
  4: 4,
} satisfies Record<PostCreateStep, PostCreateStep>;

const isQuestionStep = (
  step: PostCreateStep,
): step is PostCreateQuestionStep => {
  return step !== TOTAL_STEP;
};

export const PostCreateFlow = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState<PostCreateStep>(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const postCreateForm = usePostCreateForm();
  const createPostMutation = useMutation(POST_MUTATION_OPTIONS.CREATE());
  const {
    countryOptions,
    hasMoreCountries,
    isLoadingMoreCountries,
    loadMoreCountries,
  } = useCountryList();
  const citySearch = useCitySearch({
    countryId: postCreateForm.selectedCountry?.id,
    keyword: postCreateForm.city,
    selectedCity: postCreateForm.selectedCity,
  });

  const canGoNext = postCreateForm.canGoNext(currentStep);
  const isSubmitStep = currentStep === TOTAL_STEP;

  const handleBackClick = () => {
    if (createPostMutation.isPending) {
      return;
    }

    if (currentStep === 1) {
      router.back();
      return;
    }

    setCurrentStep(PREVIOUS_STEP_BY_STEP[currentStep]);
  };

  const handleNextClick = () => {
    if (!canGoNext || createPostMutation.isPending) {
      return;
    }

    if (currentStep === TOTAL_STEP) {
      const payload = postCreateForm.getPostFormPayload();

      if (!payload) {
        return;
      }

      createPostMutation.mutate(payload, {
        onSuccess: (postId) => {
          void queryClient.invalidateQueries({
            queryKey: POST_QUERY_KEY.ALL,
          });
          router.replace(ROUTES.POST.DETAIL(postId));
        },
      });
      return;
    }

    setCurrentStep(NEXT_STEP_BY_STEP[currentStep]);
  };

  const handleDateClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateConfirm = (value: DateRangeTypes) => {
    postCreateForm.setDateRange(value);
    setIsDatePickerOpen(false);
  };

  return (
    <main className="flex min-h-dvh flex-col bg-white">
      <div className="sticky top-0 z-10 bg-white">
        <Header
          content={
            <span className="text-title-b-20 text-gray-800">
              동행 글 작성하기
            </span>
          }
          contentAlign="center"
          hasBackButton
          onBackClick={handleBackClick}
        />
        <div className="px-4">
          <ProgressBar currentStep={currentStep} totalStep={TOTAL_STEP} />
        </div>
      </div>

      <section className="flex flex-1 flex-col px-4 pt-10">
        <div className="flex flex-col gap-6">
          {isQuestionStep(currentStep) && (
            <PostCreateQuestionHeader
              title={STEP_CONTENTS[currentStep].title}
              description={STEP_CONTENTS[currentStep].description}
            />
          )}

          {currentStep === 1 && (
            <PostCreateCountryStep
              options={countryOptions}
              value={postCreateForm.selectedCountry}
              hasMore={hasMoreCountries}
              isLoadingMore={isLoadingMoreCountries}
              onChange={postCreateForm.handleCountrySelect}
              onLoadMore={loadMoreCountries}
            />
          )}

          {currentStep === 2 && (
            <PostCreateCityStep
              city={postCreateForm.city}
              selectedCity={postCreateForm.selectedCity}
              cityResults={citySearch.cities}
              isCitySearchError={citySearch.isError}
              onCityChange={postCreateForm.handleCityChange}
              onCitySelect={postCreateForm.handleCitySelect}
            />
          )}

          {currentStep === 3 && (
            <PostCreateDateStep
              dateRange={postCreateForm.dateRange}
              isDatePickerOpen={isDatePickerOpen}
              onDateClick={handleDateClick}
              onDatePickerClose={() => setIsDatePickerOpen(false)}
              onDateConfirm={handleDateConfirm}
            />
          )}

          {currentStep === 4 && (
            <PostCreateDetailStep
              value={postCreateForm.detail}
              imageCount={postCreateForm.imageCount}
              onChange={postCreateForm.updateDetail}
              onImagesChange={postCreateForm.addImages}
            />
          )}
        </div>
      </section>

      <div
        className={cn(
          'flex flex-col gap-4 px-4 pb-8.5',
          currentStep === 4 && 'pt-10',
        )}
      >
        <Button
          aria-busy={createPostMutation.isPending}
          disabled={!canGoNext || createPostMutation.isPending}
          onClick={handleNextClick}
        >
          {isSubmitStep
            ? createPostMutation.isPending
              ? '작성 중...'
              : '작성하기'
            : '다음'}
        </Button>
      </div>
    </main>
  );
};

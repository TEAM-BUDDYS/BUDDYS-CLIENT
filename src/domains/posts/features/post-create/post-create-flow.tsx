'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { PostDetail } from '@/domains/posts/model/post-detail';
import { cn } from '@/lib/cn';
import { useCitySearch } from '@/shared/api';
import { Header } from '@/shared/components/layout';
import {
  Button,
  type DateRangeTypes,
  ProgressBar,
} from '@/shared/components/ui';

import { STEP_CONTENTS, TOTAL_STEP } from './constants';
import type { PostCreateQuestionStep, PostCreateStep } from './model';
import { PostCreateCityStep } from './post-create-city-step';
import { PostCreateCountryStep } from './post-create-country-step';
import { PostCreateDateStep } from './post-create-date-step';
import { PostCreateDetailStep } from './post-create-detail-step';
import { PostCreateQuestionHeader } from './post-create-question-header';
import { usePostCreateForm } from './use-post-create-form';
import { usePostSubmit } from './use-post-submit';

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

interface PostCreateFlowProps {
  initialPost?: PostDetail;
}

export const PostCreateFlow = ({ initialPost }: PostCreateFlowProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<PostCreateStep>(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const postCreateForm = usePostCreateForm(initialPost);
  const { clearSubmitError, isSubmitting, submitErrorMessage, submitPost } =
    usePostSubmit({ postId: initialPost?.postId });
  const citySearch = useCitySearch({
    countryId: postCreateForm.selectedCountry?.id,
    keyword: postCreateForm.city,
    selectedCity: postCreateForm.selectedCity,
  });

  const canGoNext = postCreateForm.canGoNext(currentStep);
  const isSubmitStep = currentStep === TOTAL_STEP;
  const isEditMode = initialPost !== undefined;
  const submitActionLabel = isEditMode ? '수정' : '작성';

  const handleBackClick = () => {
    if (isSubmitting) {
      return;
    }

    clearSubmitError();

    if (currentStep === 1) {
      router.back();
      return;
    }

    setCurrentStep(PREVIOUS_STEP_BY_STEP[currentStep]);
  };

  const handleSubmitPost = () => {
    const payload = postCreateForm.getPostFormPayload();

    if (!payload) {
      return;
    }

    void submitPost(payload, postCreateForm.images);
  };

  const handleNextClick = () => {
    if (!canGoNext || isSubmitting) {
      return;
    }

    if (currentStep === TOTAL_STEP) {
      handleSubmitPost();
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
            <span className="text-title-b-18 text-gray-800">
              {`동행 글 ${submitActionLabel}하기`}
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
              keyword={postCreateForm.countryKeyword}
              selectedCountry={postCreateForm.selectedCountry}
              onKeywordChange={postCreateForm.handleCountryKeywordChange}
              onSelect={postCreateForm.handleCountrySelect}
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
              images={postCreateForm.images}
              isSubmitting={isSubmitting}
              onChange={postCreateForm.updateDetail}
              onImagesAdd={postCreateForm.addImages}
              onImageRemove={postCreateForm.removeImage}
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
        {isSubmitStep && submitErrorMessage && (
          <p className="text-caption-r-12 text-error text-center" role="alert">
            {submitErrorMessage}
          </p>
        )}
        <Button
          aria-busy={isSubmitting}
          disabled={!canGoNext || isSubmitting}
          onClick={handleNextClick}
        >
          {isSubmitStep
            ? isSubmitting
              ? `${submitActionLabel} 중...`
              : `${submitActionLabel}하기`
            : '다음'}
        </Button>
      </div>
    </main>
  );
};

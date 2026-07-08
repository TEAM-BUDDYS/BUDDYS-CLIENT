'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  CITY_OPTIONS,
  STEP_CONTENTS,
  TOTAL_STEP,
} from '@/domains/posts/features/post-create/constants';
import { PostCreateCityStep } from '@/domains/posts/features/post-create/post-create-city-step';
import { PostCreateCountryStep } from '@/domains/posts/features/post-create/post-create-country-step';
import { PostCreateDateStep } from '@/domains/posts/features/post-create/post-create-date-step';
import { PostCreateQuestionHeader } from '@/domains/posts/features/post-create/post-create-question-header';
import { Header } from '@/shared/components/layout';
import {
  Button,
  type DateRangeTypes,
  ProgressBar,
} from '@/shared/components/ui';

export const PostCreateFlow = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [dateRange, setDateRange] = useState<DateRangeTypes>({
    startDate: null,
    endDate: null,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const currentContent = STEP_CONTENTS[currentStep - 1];

  const canGoNext = useMemo(() => {
    if (currentStep === 1) {
      return country.length > 0;
    }

    if (currentStep === 2) {
      return selectedCity.length > 0;
    }

    return Boolean(dateRange.startDate && dateRange.endDate);
  }, [
    country,
    currentStep,
    dateRange.endDate,
    dateRange.startDate,
    selectedCity,
  ]);

  // TODO: 도시 검색 API 연동 후 서버 응답값으로 변경
  const cityResults =
    city === '서울' && selectedCity !== city ? CITY_OPTIONS : [];

  const handleBackClick = () => {
    if (currentStep === 1) {
      router.back();
      return;
    }

    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNextClick = () => {
    if (!canGoNext || currentStep === 3) {
      return;
    }

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleCityChange = (value: string) => {
    setCity(value);

    if (selectedCity && value !== selectedCity) {
      setSelectedCity('');
    }
  };

  const handleCitySelect = (value: string) => {
    setCity(value);
    setSelectedCity(value);
  };

  const handleDateClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateConfirm = (value: DateRangeTypes) => {
    setDateRange(value);
    setIsDatePickerOpen(false);
  };

  return (
    <main className="flex min-h-dvh flex-col bg-white">
      <div className="sticky top-0 z-10 bg-white">
        <Header
          content="동행 글 작성하기"
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
          <PostCreateQuestionHeader
            title={currentContent.title}
            description={currentContent.description}
          />

          {currentStep === 1 && (
            <PostCreateCountryStep value={country} onChange={setCountry} />
          )}

          {currentStep === 2 && (
            <PostCreateCityStep
              city={city}
              selectedCity={selectedCity}
              cityResults={cityResults}
              onCityChange={handleCityChange}
              onCitySelect={handleCitySelect}
            />
          )}

          {currentStep === 3 && (
            <PostCreateDateStep
              dateRange={dateRange}
              isDatePickerOpen={isDatePickerOpen}
              onDateClick={handleDateClick}
              onDatePickerClose={() => setIsDatePickerOpen(false)}
              onDateConfirm={handleDateConfirm}
            />
          )}
        </div>
      </section>

      <div className="flex flex-col gap-4 px-4 pb-8.5">
        <Button disabled={!canGoNext} onClick={handleNextClick}>
          다음
        </Button>
        {currentStep === 3 && (
          <button
            type="button"
            className="text-body-r-14 text-gray-500"
            onClick={() => setDateRange({ startDate: null, endDate: null })}
          >
            건너뛰기
          </button>
        )}
      </div>
    </main>
  );
};

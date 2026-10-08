'use client';

import {
  FormLabel,
  SearchOptionField,
  TextField,
} from '@/shared/components/ui';

import type { OnboardLocationOption } from '../../model/onboard';

interface OnboardExchangeInfoStepProps {
  countryKeyword: string;
  countryOptions: OnboardLocationOption[];
  isCountrySearchError: boolean;
  selectedCountry: OnboardLocationOption | null;
  school: string;
  selectedSchool: OnboardLocationOption | null;
  schoolResults: OnboardLocationOption[];
  startMonth: string;
  endMonth: string;
  onCountryChange: (value: OnboardLocationOption) => void;
  onCountryKeywordChange: (value: string) => void;
  onSchoolChange: (value: string) => void;
  onSchoolSelect: (value: OnboardLocationOption) => void;
  onStartMonthChange: (value: string) => void;
  onEndMonthChange: (value: string) => void;
}

export const OnboardExchangeInfoStep = ({
  countryKeyword,
  countryOptions,
  isCountrySearchError,
  selectedCountry,
  school,
  selectedSchool,
  schoolResults,
  startMonth,
  endMonth,
  onCountryChange,
  onCountryKeywordChange,
  onSchoolChange,
  onSchoolSelect,
  onStartMonthChange,
  onEndMonthChange,
}: OnboardExchangeInfoStepProps) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <FormLabel as="h2">파견 국가</FormLabel>
        <SearchOptionField
          id="exchange-country"
          label="파견 국가 검색"
          placeholder="국가명을 검색해주세요"
          value={countryKeyword}
          selectedOption={selectedCountry}
          results={countryOptions}
          getOptionLabel={(country) => country.name}
          getOptionKey={(country) => country.id}
          onChange={onCountryKeywordChange}
          onSelect={onCountryChange}
        />
        {isCountrySearchError && (
          <p className="text-caption-r-12 text-error" role="alert">
            국가 목록을 불러오지 못했습니다. 다시 검색해주세요.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <FormLabel as="h2">파견 학교</FormLabel>
        <SearchOptionField
          id="exchange-school"
          label="파견 학교 검색"
          disabled={!selectedCountry}
          placeholder="파견 학교 검색"
          value={school}
          selectedOption={selectedSchool}
          results={schoolResults}
          getOptionKey={(school) => school.id}
          getOptionLabel={(school) => school.koreanName ?? school.name}
          onChange={onSchoolChange}
          onSelect={onSchoolSelect}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FormLabel as="h2">파견 기간</FormLabel>
        <div className="flex items-center gap-4">
          <TextField
            aria-label="파견 시작월"
            placeholder="YYYY.MM"
            value={startMonth}
            onChange={(event) => onStartMonthChange(event.target.value)}
          />
          <span className="text-title-b-20 text-gray-500">~</span>
          <TextField
            aria-label="파견 종료월"
            placeholder="YYYY.MM"
            value={endMonth}
            onChange={(event) => onEndMonthChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

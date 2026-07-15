'use client';

import { Dropdown, FormLabel, TextField } from '@/shared/components/ui';

import { SearchOptionField } from '../../components/search-option-field/search-option-field';
import type { OnboardLocationOption } from '../../model/onboard';

interface OnboardExchangeInfoStepProps {
  countryOptions: OnboardLocationOption[];
  selectedCountry: OnboardLocationOption | null;
  hasMoreCountries: boolean;
  isLoadingMoreCountries: boolean;
  school: string;
  selectedSchool: OnboardLocationOption | null;
  schoolResults: OnboardLocationOption[];
  startMonth: string;
  endMonth: string;
  onCountryChange: (value: OnboardLocationOption) => void;
  onLoadMoreCountries: () => void;
  onSchoolChange: (value: string) => void;
  onSchoolSelect: (value: OnboardLocationOption) => void;
  onStartMonthChange: (value: string) => void;
  onEndMonthChange: (value: string) => void;
}

export const OnboardExchangeInfoStep = ({
  countryOptions,
  selectedCountry,
  hasMoreCountries,
  isLoadingMoreCountries,
  school,
  selectedSchool,
  schoolResults,
  startMonth,
  endMonth,
  onCountryChange,
  onLoadMoreCountries,
  onSchoolChange,
  onSchoolSelect,
  onStartMonthChange,
  onEndMonthChange,
}: OnboardExchangeInfoStepProps) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <FormLabel as="h2">파견 국가</FormLabel>
        <Dropdown
          options={countryOptions}
          placeholder="국가 선택"
          value={selectedCountry}
          hasMore={hasMoreCountries}
          isLoadingMore={isLoadingMoreCountries}
          getOptionLabel={(country) => country.name}
          getOptionKey={(country) => country.id}
          onChange={onCountryChange}
          onLoadMore={onLoadMoreCountries}
        />
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

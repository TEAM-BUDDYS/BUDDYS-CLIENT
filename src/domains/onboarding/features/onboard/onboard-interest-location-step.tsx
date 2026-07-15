'use client';

import { type City, getCityDisplayName } from '@/shared/api';
import { Dropdown, FormLabel } from '@/shared/components/ui';

import { SearchOptionField } from '../../components/search-option-field/search-option-field';
import type { OnboardLocationOption } from '../../model/onboard';

interface OnboardInterestLocationStepProps {
  countryOptions: OnboardLocationOption[];
  selectedCountry: OnboardLocationOption | null;
  hasMoreCountries: boolean;
  isLoadingMoreCountries: boolean;
  city: string;
  selectedCity: City | null;
  cityResults: City[];
  isCitySearchError: boolean;
  onCountryChange: (value: OnboardLocationOption) => void;
  onLoadMoreCountries: () => void;
  onCityChange: (value: string) => void;
  onCitySelect: (value: City) => void;
}

export const OnboardInterestLocationStep = ({
  countryOptions,
  selectedCountry,
  hasMoreCountries,
  isLoadingMoreCountries,
  city,
  selectedCity,
  cityResults,
  isCitySearchError,
  onCountryChange,
  onLoadMoreCountries,
  onCityChange,
  onCitySelect,
}: OnboardInterestLocationStepProps) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <FormLabel as="h2">관심 국가</FormLabel>
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
        <FormLabel as="h2">관심 도시</FormLabel>
        <SearchOptionField
          id="interest-city"
          label="관심 도시 검색"
          disabled={!selectedCountry}
          placeholder="도시명을 검색해주세요"
          value={city}
          selectedOption={selectedCity}
          results={cityResults}
          getOptionKey={(city) => city.id ?? ''}
          getOptionLabel={(cityResult) => getCityDisplayName(cityResult, city)}
          onChange={onCityChange}
          onSelect={onCitySelect}
        />
        <span
          className={
            isCitySearchError
              ? 'text-caption-r-12 text-error'
              : 'text-caption-r-12 text-gray-500'
          }
        >
          {isCitySearchError
            ? '도시 목록을 불러오지 못했습니다. 다시 검색해주세요.'
            : '한글로 검색이 안 된다면 영어로 검색해보세요.'}
        </span>
      </div>
    </div>
  );
};

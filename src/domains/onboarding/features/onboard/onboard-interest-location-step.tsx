'use client';

import { Dropdown, FormLabel } from '@/shared/components/ui';

import { SearchOptionField } from '../../components/search-option-field/search-option-field';
import type { OnboardLocationOption } from '../../model/onboard';
import { findCountryByName } from '../../utils/country-options';

interface OnboardInterestLocationStepProps {
  countryOptions: OnboardLocationOption[];
  selectedCountry: OnboardLocationOption | null;
  hasMoreCountries: boolean;
  isLoadingMoreCountries: boolean;
  city: string;
  selectedCity: OnboardLocationOption | null;
  cityResults: OnboardLocationOption[];
  onCountryChange: (value: OnboardLocationOption) => void;
  onLoadMoreCountries: () => void;
  onCityChange: (value: string) => void;
  onCitySelect: (value: OnboardLocationOption) => void;
}

export const OnboardInterestLocationStep = ({
  countryOptions,
  selectedCountry,
  hasMoreCountries,
  isLoadingMoreCountries,
  city,
  selectedCity,
  cityResults,
  onCountryChange,
  onLoadMoreCountries,
  onCityChange,
  onCitySelect,
}: OnboardInterestLocationStepProps) => {
  const countryNames = countryOptions.map((country) => country.name);

  const handleCountryChange = (countryName: string) => {
    const selectedCountry = findCountryByName(countryOptions, countryName);

    if (selectedCountry) {
      onCountryChange(selectedCountry);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <FormLabel as="h2">관심 국가</FormLabel>
        <Dropdown
          options={countryNames}
          placeholder="국가 선택"
          value={selectedCountry?.name ?? ''}
          hasMore={hasMoreCountries}
          isLoadingMore={isLoadingMoreCountries}
          onChange={handleCountryChange}
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
          onChange={onCityChange}
          onSelect={onCitySelect}
        />
        <span className="text-caption-r-12 text-gray-500">
          한글로 검색이 안 된다면 영어로 검색해보세요.
        </span>
      </div>
    </div>
  );
};

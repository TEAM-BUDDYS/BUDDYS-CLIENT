'use client';

import { Dropdown, FormLabel } from '@/shared/components/ui';

import { SearchOptionField } from '../../components/search-option-field/search-option-field';
import type { OnboardLocationOption } from '../../model/onboard';

interface OnboardInterestLocationStepProps {
  countryOptions: OnboardLocationOption[];
  selectedCountry: OnboardLocationOption | null;
  city: string;
  selectedCity: OnboardLocationOption | null;
  cityResults: OnboardLocationOption[];
  onCountryChange: (value: OnboardLocationOption) => void;
  onCityChange: (value: string) => void;
  onCitySelect: (value: OnboardLocationOption) => void;
}

export const OnboardInterestLocationStep = ({
  countryOptions,
  selectedCountry,
  city,
  selectedCity,
  cityResults,
  onCountryChange,
  onCityChange,
  onCitySelect,
}: OnboardInterestLocationStepProps) => {
  const countryNames = countryOptions.map((country) => country.name);

  const handleCountryChange = (countryName: string) => {
    const selectedCountry = countryOptions.find(
      (country) => country.name === countryName,
    );

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
          onChange={handleCountryChange}
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

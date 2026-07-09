'use client';

import type { OnboardLocationOption } from './model';
import { SearchOptionField } from './search-option-field';

interface InterestCityProps {
  city: string;
  disabled?: boolean;
  selectedCity: OnboardLocationOption | null;
  cityResults: OnboardLocationOption[];
  onCityChange: (value: string) => void;
  onCitySelect: (value: OnboardLocationOption) => void;
}

export const InterestCity = ({
  city,
  disabled = false,
  selectedCity,
  cityResults,
  onCityChange,
  onCitySelect,
}: InterestCityProps) => {
  return (
    <SearchOptionField
      id="interest-city"
      label="관심 도시 검색"
      disabled={disabled}
      placeholder="도시명을 검색해주세요"
      value={city}
      selectedOption={selectedCity}
      results={cityResults}
      onChange={onCityChange}
      onSelect={onCitySelect}
    />
  );
};

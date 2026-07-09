'use client';

import { FormLabel } from '@/shared/components/ui';

import { InterestCity } from './interest-city';
import { InterestCountry } from './interest-country';
import type { OnboardLocationOption } from './model';

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
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <FormLabel as="h2">관심 국가</FormLabel>
        <InterestCountry
          options={countryOptions}
          value={selectedCountry}
          onChange={onCountryChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FormLabel as="h2">관심 도시</FormLabel>
        <InterestCity
          disabled={!selectedCountry}
          city={city}
          selectedCity={selectedCity}
          cityResults={cityResults}
          onCityChange={onCityChange}
          onCitySelect={onCitySelect}
        />
        <span className="text-caption-r-12 text-gray-500">
          한글로 검색이 안 된다면 영어로 검색해보세요.
        </span>
      </div>
    </div>
  );
};

'use client';

import { Dropdown } from '@/shared/components/ui';

import type { OnboardLocationOption } from './model';

interface InterestCountryProps {
  options: OnboardLocationOption[];
  value: OnboardLocationOption | null;
  onChange: (value: OnboardLocationOption) => void;
}

export const InterestCountry = ({
  options,
  value,
  onChange,
}: InterestCountryProps) => {
  const countryNames = options.map((country) => country.name);

  const handleCountryChange = (countryName: string) => {
    const selectedCountry = options.find(
      (country) => country.name === countryName,
    );

    if (selectedCountry) {
      onChange(selectedCountry);
    }
  };

  return (
    <Dropdown
      options={countryNames}
      placeholder="국가 선택"
      value={value?.name ?? ''}
      onChange={handleCountryChange}
    />
  );
};

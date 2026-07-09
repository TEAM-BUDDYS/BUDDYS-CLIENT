'use client';

import { Dropdown } from '@/shared/components/ui';

import type { LocationOption } from './model';

interface PostCreateCountryStepProps {
  options: LocationOption[];
  value: LocationOption | null;
  onChange: (value: LocationOption) => void;
}

export const PostCreateCountryStep = ({
  options,
  value,
  onChange,
}: PostCreateCountryStepProps) => {
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
      placeholder="국가를 선택해주세요"
      value={value?.name ?? ''}
      onChange={handleCountryChange}
    />
  );
};

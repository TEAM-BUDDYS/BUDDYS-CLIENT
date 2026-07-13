'use client';

import { Dropdown } from '@/shared/components/ui';

import type { LocationOption } from './model';

interface PostCreateCountryStepProps {
  options: LocationOption[];
  value: LocationOption | null;
  hasMore: boolean;
  isLoadingMore: boolean;
  onChange: (value: LocationOption) => void;
  onLoadMore: () => void;
}

export const PostCreateCountryStep = ({
  options,
  value,
  hasMore,
  isLoadingMore,
  onChange,
  onLoadMore,
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
      hasMore={hasMore}
      isLoadingMore={isLoadingMore}
      onChange={handleCountryChange}
      onLoadMore={onLoadMore}
    />
  );
};

'use client';

import { useCountryList } from '@/shared/api';
import { Dropdown } from '@/shared/components/ui';

interface CountryFilterFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const CountryFilterField = ({
  value,
  onChange,
}: CountryFilterFieldProps) => {
  const {
    countryOptions,
    hasMoreCountries,
    isLoadingMoreCountries,
    loadMoreCountries,
  } = useCountryList();
  const countryNames = countryOptions.map((country) => country.name);

  return (
    <Dropdown
      options={countryNames}
      value={value}
      placeholder="선택해주세요."
      hasMore={hasMoreCountries}
      isLoadingMore={isLoadingMoreCountries}
      onChange={onChange}
      onLoadMore={loadMoreCountries}
    />
  );
};

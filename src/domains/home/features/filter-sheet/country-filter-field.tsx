'use client';

import { type Country, useCountryList } from '@/shared/api';
import { Dropdown } from '@/shared/components/ui';

interface CountryFilterFieldProps {
  value: Country | null;
  onChange: (value: Country) => void;
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

  return (
    <Dropdown
      options={countryOptions}
      value={value}
      placeholder="선택해주세요."
      hasMore={hasMoreCountries}
      isLoadingMore={isLoadingMoreCountries}
      getOptionLabel={(country) => country.name}
      getOptionKey={(country) => country.id}
      onChange={onChange}
      onLoadMore={loadMoreCountries}
    />
  );
};

'use client';

import { type UIEvent, useState } from 'react';

import { type Country, useCountrySearch } from '@/shared/api';
import { OptionItem, OptionList, Searchbar } from '@/shared/components/ui';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

interface CountryFilterFieldProps {
  value: Country | null;
  onChange: (value: Country | null) => void;
}

export const CountryFilterField = ({
  value,
  onChange,
}: CountryFilterFieldProps) => {
  const [keyword, setKeyword] = useState(value?.name ?? '');
  const debouncedKeyword = useDebouncedValue(keyword, 300);
  const trimmedKeyword = keyword.trim();
  const isSelectedCountry = value?.name === trimmedKeyword;
  const isSearchKeywordSynced = debouncedKeyword.trim() === trimmedKeyword;
  const { countries, isError, loadMoreCountries } = useCountrySearch({
    keyword: debouncedKeyword,
    enabled: !isSelectedCountry,
  });
  const isCountrySearchError =
    !isSelectedCountry && isSearchKeywordSynced && isError;
  const countryResults = isSearchKeywordSynced ? countries : [];
  const isResultOpen = countryResults.length > 0;
  const listboxId = 'partner-country-filter-results';

  const handleKeywordChange = (nextKeyword: string) => {
    setKeyword(nextKeyword);

    if (value && value.name !== nextKeyword.trim()) {
      onChange(null);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setKeyword(country.name);
    onChange(country);
  };

  const handleResultScroll = (event: UIEvent<HTMLUListElement>) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight + 24) {
      loadMoreCountries();
    }
  };

  return (
    <div className="relative w-full">
      <Searchbar
        aria-autocomplete="list"
        aria-controls={isResultOpen ? listboxId : undefined}
        aria-expanded={isResultOpen}
        aria-haspopup="listbox"
        aria-label="국가 검색"
        placeholder="국가명을 검색해주세요"
        role="combobox"
        size="medium"
        value={keyword}
        onChange={handleKeywordChange}
      />
      {isResultOpen && (
        <OptionList id={listboxId} onScroll={handleResultScroll}>
          {countryResults.map((country) => (
            <OptionItem
              key={country.id}
              option={country.name}
              isSelected={value?.id === country.id}
              onSelect={() => handleCountrySelect(country)}
            />
          ))}
        </OptionList>
      )}
      {isCountrySearchError && (
        <p className="text-caption-r-12 text-error mt-2" role="alert">
          국가 목록을 불러오지 못했습니다. 다시 검색해 주세요.
        </p>
      )}
    </div>
  );
};

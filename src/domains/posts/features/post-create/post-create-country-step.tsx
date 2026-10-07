'use client';

import { SearchOptionField } from '@/shared/components/ui';

import type { LocationOption } from './model';
import { usePostCountrySearch } from './use-post-country-search';

interface PostCreateCountryStepProps {
  keyword: string;
  selectedCountry: LocationOption | null;
  onKeywordChange: (value: string) => void;
  onSelect: (value: LocationOption) => void;
}

export const PostCreateCountryStep = ({
  keyword,
  selectedCountry,
  onKeywordChange,
  onSelect,
}: PostCreateCountryStepProps) => {
  const countrySearch = usePostCountrySearch({
    keyword,
    enabled: selectedCountry === null,
  });

  return (
    <div className="flex flex-col gap-2">
      <SearchOptionField
        id="post-country"
        label="국가 검색"
        placeholder="국가를 검색해주세요."
        value={keyword}
        selectedOption={selectedCountry}
        results={countrySearch.countries}
        isLoading={countrySearch.isSearching}
        getOptionLabel={(country) => country.name}
        getOptionKey={(country) => country.id}
        onChange={onKeywordChange}
        onSelect={onSelect}
        onEndReached={countrySearch.loadMoreCountries}
      />

      {countrySearch.isError && (
        <p className="text-caption-r-12 text-error" role="alert">
          국가 목록을 불러오지 못했습니다. 다시 검색해주세요.
        </p>
      )}
    </div>
  );
};

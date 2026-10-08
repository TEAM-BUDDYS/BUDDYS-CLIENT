'use client';

import { type UIEvent, useState } from 'react';

import type { Country } from '@/shared/api';
import { OptionItem, OptionList, Searchbar } from '@/shared/components/ui';

import { SelectedRegionItem } from '../../components/selected-region-item/selected-region-item';
import { useCourseCountrySearch } from './use-course-country-search';

const COUNTRY_RESULT_LIST_ID = 'course-country-result-list';

interface CourseCreateCountryStepProps {
  hasUnassignedCities?: boolean;
  selectedCountries: Country[];
  onCountrySelect: (country: Country) => void;
  onCountryRemove: (countryId: number) => void;
}

export const CourseCreateCountryStep = ({
  hasUnassignedCities = false,
  selectedCountries,
  onCountrySelect,
  onCountryRemove,
}: CourseCreateCountryStepProps) => {
  const [keyword, setKeyword] = useState('');
  const countrySearch = useCourseCountrySearch({ keyword });
  const isResultOpen = countrySearch.countries.length > 0;

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
  };

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country);
    setKeyword('');
  };

  const handleCountryRemove = (countryId: number) => {
    onCountryRemove(countryId);
  };

  const handleResultScroll = (event: UIEvent<HTMLUListElement>) => {
    const resultList = event.currentTarget;
    const remainingScroll =
      resultList.scrollHeight - resultList.scrollTop - resultList.clientHeight;

    if (
      remainingScroll <= 24 &&
      countrySearch.hasMoreCountries &&
      !countrySearch.isLoadingMoreCountries
    ) {
      countrySearch.loadMoreCountries();
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="relative w-full">
        <Searchbar
          aria-autocomplete="list"
          aria-busy={countrySearch.isSearching}
          aria-controls={isResultOpen ? COUNTRY_RESULT_LIST_ID : undefined}
          aria-expanded={isResultOpen}
          aria-haspopup="listbox"
          aria-label="국가 검색"
          placeholder="국가를 검색해주세요."
          role="combobox"
          size="medium"
          value={keyword}
          onChange={handleKeywordChange}
        />

        {isResultOpen && (
          <OptionList id={COUNTRY_RESULT_LIST_ID} onScroll={handleResultScroll}>
            {countrySearch.countries.map((country) => (
              <OptionItem
                key={country.id}
                option={country.name}
                isSelected={selectedCountries.some(
                  ({ id }) => id === country.id,
                )}
                onSelect={() => handleCountrySelect(country)}
              />
            ))}

            {countrySearch.isLoadingMoreCountries && (
              <li className="text-caption-r-12 px-4 py-3 text-center text-gray-500">
                <span role="status">더 불러오는 중입니다.</span>
              </li>
            )}
          </OptionList>
        )}

        {countrySearch.isError && (
          <p className="text-caption-r-12 text-error mt-2" role="alert">
            국가 목록을 불러오지 못했습니다. 다시 검색해주세요.
          </p>
        )}
      </div>

      {selectedCountries.length > 0 && (
        <section aria-label="선택한 여행 국가" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-title-b-18 text-gray-800">내 여행 지역</h2>
            {hasUnassignedCities && selectedCountries.length > 1 && (
              <p className="text-caption-r-12 text-gray-500">
                국가를 변경하면 기존 도시를 다시 선택해야 해요.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {selectedCountries.map((country) => (
              <SelectedRegionItem
                key={country.id}
                regionName={country.name}
                onRemove={() => handleCountryRemove(country.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

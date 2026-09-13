'use client';

import { useState } from 'react';

import { type Country, getCityDisplayName } from '@/shared/api';
import { OptionItem, OptionList, Searchbar } from '@/shared/components/ui';

import { SelectedRegionItem } from '../../components/selected-region-item/selected-region-item';
import type { CourseCreateCityOption } from './model';
import { useCourseCitySearch } from './use-course-city-search';

const CITY_RESULT_LIST_ID = 'course-city-result-list';

interface CourseCreateCityStepProps {
  countries: Country[];
  selectedCities: CourseCreateCityOption[];
  onCitySelect: (city: CourseCreateCityOption) => void;
  onCityRemove: (cityId: number) => void;
}

export const CourseCreateCityStep = ({
  countries,
  selectedCities,
  onCitySelect,
  onCityRemove,
}: CourseCreateCityStepProps) => {
  const [keyword, setKeyword] = useState('');
  const [selectedResultId, setSelectedResultId] = useState<number | null>(null);
  const citySearch = useCourseCitySearch({
    countries,
    keyword,
    isInputSelected: selectedResultId !== null,
  });
  const isResultOpen = citySearch.cities.length > 0;

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setSelectedResultId(null);
  };

  const handleCitySelect = (city: CourseCreateCityOption) => {
    setKeyword(getCityDisplayName(city, keyword));
    setSelectedResultId(city.id);
    onCitySelect(city);
  };

  const handleCityRemove = (cityId: number) => {
    if (selectedResultId === cityId) {
      setKeyword('');
      setSelectedResultId(null);
    }

    onCityRemove(cityId);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="relative w-full">
        <Searchbar
          aria-autocomplete="list"
          aria-busy={citySearch.isSearching}
          aria-controls={isResultOpen ? CITY_RESULT_LIST_ID : undefined}
          aria-expanded={isResultOpen}
          aria-haspopup="listbox"
          aria-label="도시 검색"
          isCompleted={selectedResultId !== null}
          placeholder="도시를 검색해주세요."
          role="combobox"
          size="medium"
          value={keyword}
          onChange={handleKeywordChange}
          onFocus={() => setSelectedResultId(null)}
        />

        {isResultOpen && (
          <OptionList id={CITY_RESULT_LIST_ID}>
            {citySearch.cities.map((city) => (
              <OptionItem
                key={city.id}
                option={getCityDisplayName(city, keyword)}
                isSelected={selectedCities.some(({ id }) => id === city.id)}
                onSelect={() => handleCitySelect(city)}
              />
            ))}
          </OptionList>
        )}

        {citySearch.isError && (
          <p className="text-caption-r-12 text-error mt-2" role="alert">
            도시 목록을 불러오지 못했습니다. 다시 검색해주세요.
          </p>
        )}
      </div>

      {selectedCities.length > 0 && (
        <section aria-label="선택한 여행 도시" className="flex flex-col gap-4">
          <h2 className="text-title-b-18 text-gray-800">내 여행 지역</h2>
          <div className="flex flex-col gap-2">
            {selectedCities.map((city) => (
              <SelectedRegionItem
                key={city.id}
                regionName={getCityDisplayName(city)}
                onRemove={() => handleCityRemove(city.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

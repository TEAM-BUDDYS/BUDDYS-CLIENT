'use client';

import { type City, getCityDisplayName } from '@/shared/api';
import { OptionItem, OptionList, Searchbar } from '@/shared/components/ui';

interface PostCreateCityStepProps {
  city: string;
  selectedCity: City | null;
  cityResults: City[];
  isCitySearchError: boolean;
  onCityChange: (value: string) => void;
  onCitySelect: (value: City) => void;
}

export const PostCreateCityStep = ({
  city,
  selectedCity,
  cityResults,
  isCitySearchError,
  onCityChange,
  onCitySelect,
}: PostCreateCityStepProps) => {
  const isCityResultOpen = cityResults.length > 0;

  return (
    <div className="relative w-full">
      <Searchbar
        aria-autocomplete="list"
        aria-controls={isCityResultOpen ? 'city-result-list' : undefined}
        aria-expanded={isCityResultOpen}
        aria-haspopup="listbox"
        aria-label="도시 검색"
        className="w-full"
        placeholder="도시를 검색해주세요."
        role="combobox"
        size="medium"
        value={city}
        onChange={onCityChange}
      />
      {isCityResultOpen && (
        <OptionList id="city-result-list" className="w-full">
          {cityResults.map((cityResult) => (
            <OptionItem
              key={cityResult.id}
              option={getCityDisplayName(cityResult)}
              isSelected={selectedCity?.id === cityResult.id}
              onSelect={() => onCitySelect(cityResult)}
            />
          ))}
        </OptionList>
      )}
      {isCitySearchError && (
        <p className="text-caption-r-12 text-error mt-2">
          도시 목록을 불러오지 못했습니다. 다시 검색해주세요.
        </p>
      )}
    </div>
  );
};

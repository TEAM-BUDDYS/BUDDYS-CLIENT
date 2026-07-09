'use client';

// TODO: OptionItem 삭제 후 서버 응답값으로 변경
import { OptionItem, OptionList, Searchbar } from '@/shared/components/ui';

import type { LocationOption } from './model';

interface PostCreateCityStepProps {
  city: string;
  selectedCity: LocationOption | null;
  cityResults: LocationOption[];
  onCityChange: (value: string) => void;
  onCitySelect: (value: LocationOption) => void;
}

export const PostCreateCityStep = ({
  city,
  selectedCity,
  cityResults,
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
              option={cityResult.name}
              isSelected={selectedCity?.id === cityResult.id}
              onSelect={() => onCitySelect(cityResult)}
            />
          ))}
        </OptionList>
      )}
    </div>
  );
};

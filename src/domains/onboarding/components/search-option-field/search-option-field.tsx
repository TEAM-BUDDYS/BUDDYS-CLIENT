'use client';

import { OptionItem, OptionList, Searchbar } from '@/shared/components/ui';

import type { OnboardLocationOption } from '../../model/onboard';

interface SearchOptionFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  selectedOption: OnboardLocationOption | null;
  results: OnboardLocationOption[];
  onChange: (value: string) => void;
  onSelect: (value: OnboardLocationOption) => void;
}

export const SearchOptionField = ({
  id,
  label,
  placeholder,
  value,
  disabled = false,
  selectedOption,
  results,
  onChange,
  onSelect,
}: SearchOptionFieldProps) => {
  const isResultOpen = results.length > 0;
  const listboxId = `${id}-result-list`;
  const getOptionLabel = (option: OnboardLocationOption) => {
    return option.koreanName ?? option.name;
  };

  return (
    <div className="relative w-full">
      <Searchbar
        aria-autocomplete="list"
        aria-controls={isResultOpen ? listboxId : undefined}
        aria-expanded={isResultOpen}
        aria-haspopup="listbox"
        aria-label={label}
        disabled={disabled}
        placeholder={placeholder}
        role="combobox"
        size="medium"
        value={value}
        onChange={onChange}
      />
      {isResultOpen && (
        <OptionList id={listboxId} className="w-full">
          {results.map((result) => (
            <OptionItem
              key={result.id}
              option={getOptionLabel(result)}
              isSelected={selectedOption?.id === result.id}
              onSelect={() => onSelect(result)}
            />
          ))}
        </OptionList>
      )}
    </div>
  );
};

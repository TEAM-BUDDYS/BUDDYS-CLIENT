'use client';

import type { UIEventHandler } from 'react';

import { OptionItem } from '../dropdown/option-item';
import { OptionList } from '../dropdown/option-list';
import { Searchbar } from '../searchbar/searchbar';

interface SearchOptionFieldProps<TOption> {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  isCompleted?: boolean;
  isLoading?: boolean;
  required?: boolean;
  selectedOption: TOption | null;
  results: TOption[];
  getOptionKey: (option: TOption) => string | number;
  getOptionLabel: (option: TOption) => string;
  onChange: (value: string) => void;
  onSelect: (value: TOption) => void;
  onEndReached?: () => void;
}

const RESULT_END_THRESHOLD_PX = 24;

export const SearchOptionField = <TOption,>({
  id,
  label,
  placeholder,
  value,
  disabled = false,
  isCompleted = false,
  isLoading = false,
  required = false,
  selectedOption,
  results,
  getOptionKey,
  getOptionLabel,
  onChange,
  onSelect,
  onEndReached,
}: SearchOptionFieldProps<TOption>) => {
  const isResultOpen = selectedOption === null && results.length > 0;
  const listboxId = `${id}-result-list`;

  const handleResultScroll: UIEventHandler<HTMLUListElement> = (event) => {
    if (!onEndReached) {
      return;
    }

    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;

    if (scrollHeight - scrollTop - clientHeight <= RESULT_END_THRESHOLD_PX) {
      onEndReached();
    }
  };

  return (
    <div className="relative w-full">
      <Searchbar
        aria-autocomplete="list"
        aria-busy={isLoading}
        aria-controls={isResultOpen ? listboxId : undefined}
        aria-expanded={isResultOpen}
        aria-haspopup="listbox"
        aria-label={label}
        disabled={disabled}
        id={id}
        isCompleted={isCompleted}
        placeholder={placeholder}
        role="combobox"
        required={required}
        size="medium"
        value={value}
        onChange={onChange}
      />
      {isResultOpen && (
        <OptionList
          id={listboxId}
          className="w-full"
          onScroll={handleResultScroll}
        >
          {results.map((result) => (
            <OptionItem
              key={getOptionKey(result)}
              option={getOptionLabel(result)}
              onSelect={() => onSelect(result)}
            />
          ))}
        </OptionList>
      )}
    </div>
  );
};

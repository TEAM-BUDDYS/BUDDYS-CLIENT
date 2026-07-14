'use client';

import { OptionItem, OptionList, Searchbar } from '@/shared/components/ui';

interface SearchOptionFieldProps<TOption> {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  selectedOption: TOption | null;
  results: TOption[];
  getOptionKey: (option: TOption) => string | number;
  getOptionLabel: (option: TOption) => string;
  onChange: (value: string) => void;
  onSelect: (value: TOption) => void;
}

export const SearchOptionField = <TOption,>({
  id,
  label,
  placeholder,
  value,
  disabled = false,
  selectedOption,
  results,
  getOptionKey,
  getOptionLabel,
  onChange,
  onSelect,
}: SearchOptionFieldProps<TOption>) => {
  const isResultOpen = results.length > 0;
  const listboxId = `${id}-result-list`;

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
              key={getOptionKey(result)}
              option={getOptionLabel(result)}
              isSelected={
                selectedOption !== null &&
                getOptionKey(selectedOption) === getOptionKey(result)
              }
              onSelect={() => onSelect(result)}
            />
          ))}
        </OptionList>
      )}
    </div>
  );
};

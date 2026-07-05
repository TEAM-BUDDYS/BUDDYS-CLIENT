'use client';

import { useId, useState } from 'react';

import { useClickOutside } from '@/shared/hooks/use-click-outside';

import { OptionItem } from '../dropdown/option-item';
import { OptionList } from '../dropdown/option-list';
import { Searchbar, SearchbarSize } from './searchbar';

interface SearchbarWithDropdownProps {
  size: SearchbarSize;
  options: string[];
  ariaLabel: string;
  onSelect?: (option: string) => void;
}

export const SearchbarWithDropdown = ({
  size,
  options,
  ariaLabel,
  onSelect,
}: SearchbarWithDropdownProps) => {
  const [keyword, setKeyword] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const searchbarRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const filteredOptions = options.filter((option) => option.includes(keyword));
  const isListboxOpen = isOpen && filteredOptions.length > 0;

  const handleChange = (value: string) => {
    setKeyword(value);
    setIsOpen(value.length > 0);
  };

  const handleSelect = (option: string) => {
    setKeyword(option);
    setSelectedOption(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div ref={searchbarRef} className="relative w-fit">
      <Searchbar
        size={size}
        value={keyword}
        onChange={handleChange}
        role="combobox"
        aria-label={ariaLabel}
        aria-controls={isListboxOpen ? listboxId : undefined}
        aria-expanded={isListboxOpen}
        aria-haspopup="listbox"
        aria-autocomplete="list"
      />

      {isListboxOpen && (
        <OptionList id={listboxId}>
          {filteredOptions.map((option) => (
            <OptionItem
              key={option}
              option={option}
              isSelected={selectedOption === option}
              onSelect={() => handleSelect(option)}
            />
          ))}
        </OptionList>
      )}
    </div>
  );
};

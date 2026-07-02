'use client';

import { useState } from 'react';

import { OptionItem } from '../dropdown/option-item';
import { Searchbar, SearchbarSize } from './searchbar';

interface SearchbarWithDropdownProps {
  size: SearchbarSize;
  options: string[];
  onSelect?: (option: string) => void;
}

export const SearchbarWithDropdown = ({
  size,
  options,
  onSelect,
}: SearchbarWithDropdownProps) => {
  const [keyword, setKeyword] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) => option.includes(keyword));

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
    <div className="relative w-fit">
      <Searchbar size={size} value={keyword} onChange={handleChange} />
      {isOpen && filteredOptions.length > 0 && (
        <ul
          className="absolute top-full left-0 z-10 mt-2 flex max-h-59 w-full scrollbar-gutter-stable flex-col gap-1 overflow-y-auto rounded-xl border border-gray-200 bg-white py-2 pr-1 pl-4 shadow-md [&::-webkit-scrollbar]:w-2.25 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-clip-content [&::-webkit-scrollbar-track]:my-2.75 [&::-webkit-scrollbar-track]:bg-transparent"
          role="listbox"
        >
          {filteredOptions.map((option) => (
            <OptionItem
              key={option}
              option={option}
              isSelected={selectedOption === option}
              onSelect={() => handleSelect(option)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

'use client';

import { type KeyboardEvent, useCallback, useId, useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@/shared/components/icons';
import { useClickOutside } from '@/shared/hooks/use-click-outside';

import { OptionItem } from './option-item';
import { OptionList } from './option-list';

const DEFAULT_SORT_OPTIONS = ['최신순', '저장순'];

interface SortDropdownProps {
  options?: string[];
  value: string;
  onChange?: (value: string) => void;
}

export const SortDropdown = ({
  options = DEFAULT_SORT_OPTIONS,
  value,
  onChange,
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const handleClickOutside = useCallback(() => setIsOpen(false), []);
  const dropdownRef = useClickOutside<HTMLDivElement>(handleClickOutside);

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: string) => {
    onChange?.(option);
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block"
      onKeyDown={handleKeyDown}
    >
      <button
        aria-controls={isOpen ? listboxId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-1 py-2.75 pr-0 pl-1.5"
        onClick={handleTriggerClick}
        type="button"
      >
        <span className="text-caption-m-12 truncate text-right text-gray-800">
          {value}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="size-3 shrink-0 text-gray-200" />
        ) : (
          <ChevronDownIcon className="size-3 shrink-0 text-gray-200" />
        )}
      </button>

      {isOpen && (
        <OptionList id={listboxId}>
          {options.map((option) => (
            <OptionItem
              key={option}
              label={option}
              isSelected={option === value}
              onSelect={() => handleOptionSelect(option)}
            />
          ))}
        </OptionList>
      )}
    </div>
  );
};

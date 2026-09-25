'use client';

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@/shared/components/icons';
import { useClickOutside } from '@/shared/hooks/use-click-outside';

import { SortOptionItem } from './sort-option-item';
import { SortOptionList } from './sort-option-list';

const DEFAULT_SORT_OPTIONS = ['최신순', '저장순'];

interface SortDropdownProps {
  options?: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SortDropdown = ({
  options = DEFAULT_SORT_OPTIONS,
  value,
  onChange,
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleClickOutside = useCallback(() => setIsOpen(false), []);
  const dropdownRef = useClickOutside<HTMLDivElement>(handleClickOutside);

  useEffect(() => {
    if (!isOpen) return;

    const selectedIndex = options.indexOf(value);

    optionRefs.current[selectedIndex === -1 ? 0 : selectedIndex]?.focus();
  }, [isOpen, options, value]);

  const closeAndFocusTrigger = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: string) => {
    onChange(option);
    closeAndFocusTrigger();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      closeAndFocusTrigger();
      return;
    }

    if (!isOpen || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) {
      return;
    }

    event.preventDefault();

    const lastIndex = options.length - 1;
    const currentIndex = optionRefs.current.findIndex(
      (optionRef) => optionRef === document.activeElement,
    );
    const nextIndex =
      event.key === 'ArrowDown'
        ? currentIndex >= lastIndex
          ? 0
          : currentIndex + 1
        : currentIndex <= 0
          ? lastIndex
          : currentIndex - 1;

    optionRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block"
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
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
        <SortOptionList aria-label="정렬 기준" id={listboxId}>
          {options.map((option, index) => (
            <SortOptionItem
              key={option}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              label={option}
              isSelected={option === value}
              onSelect={() => handleOptionSelect(option)}
            />
          ))}
        </SortOptionList>
      )}
    </div>
  );
};

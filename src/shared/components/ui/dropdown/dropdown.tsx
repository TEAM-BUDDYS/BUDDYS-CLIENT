'use client';

import { useId, useState } from 'react';

import { cn } from '@/lib/cn';
import { ChevronDownIcon, ChevronUpIcon } from '@/shared/components/icons';
import { useClickOutside } from '@/shared/hooks/use-click-outside';

import { OptionItem } from './option-item';
import { OptionList } from './option-list';

interface DropdownProps {
  options: string[];
  value: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Dropdown = ({
  options,
  value,
  disabled = false,
  onChange,
  placeholder = '선택해주세요.',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const dropdownRef = useClickOutside<HTMLElement>(() => setIsOpen(false));
  const hasSelectedValue = Boolean(value);

  return (
    <article ref={dropdownRef} className="relative">
      <button
        aria-controls={isOpen ? listboxId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
        type="button"
        className={cn(
          'text-body-m-15 flex w-full justify-between rounded-xl bg-gray-50 px-4 py-3.5 text-gray-500',
          isOpen && 'bg-gray-100',
          hasSelectedValue && 'border border-gray-200 text-gray-800',
          disabled && 'bg-gray-50 text-gray-200',
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {hasSelectedValue ? value : placeholder}
        {isOpen ? (
          <ChevronUpIcon width={24} height={24} />
        ) : (
          <ChevronDownIcon width={24} height={24} />
        )}
      </button>
      {isOpen && !disabled && (
        <OptionList id={listboxId}>
          {options.map((option) => (
            <OptionItem
              key={option}
              option={option}
              isSelected={value === option}
              onSelect={() => {
                onChange?.(option);
                setIsOpen(false);
              }}
            />
          ))}
        </OptionList>
      )}
    </article>
  );
};

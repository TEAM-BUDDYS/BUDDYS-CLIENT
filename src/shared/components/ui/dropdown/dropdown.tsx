'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';
import { IcChevronDownIcon, IcChevronUpIcon } from '@/shared/components/icons';

import { OptionItem } from './option-item';

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
  const hasSelectedValue = Boolean(value);

  return (
    <article className="flex h-76 flex-col gap-4">
      <button
        disabled={disabled}
        type="button"
        className={cn(
          'text-body-m-15 flex justify-between rounded-xl bg-gray-50 px-4 py-3.5 text-gray-500',
          isOpen && 'bg-gray-100',
          hasSelectedValue && 'text-gray-800',
          disabled && 'bg-gray-50 text-gray-200',
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {hasSelectedValue ? value : placeholder}
        {isOpen ? (
          <IcChevronUpIcon width={24} height={24} />
        ) : (
          <IcChevronDownIcon width={24} height={24} />
        )}
      </button>
      {isOpen && !disabled && (
        <ul className="max-h-59 overflow-y-auto rounded-xl border border-gray-100 px-4 py-2 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-clip-content [&::-webkit-scrollbar-track]:bg-transparent">
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
        </ul>
      )}
    </article>
  );
};

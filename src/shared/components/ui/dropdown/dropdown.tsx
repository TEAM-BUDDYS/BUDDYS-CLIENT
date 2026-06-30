'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';
import { IcChevronDownIcon, IcChevronUpIcon } from '@/shared/components/icons';

import { OptionItem } from './option-item';

const options = [
  { label: '진석', value: 'jinseok' },
  { label: '승택', value: 'seungtaek' },
  { label: '진아', value: 'jina' },
  { label: '효정', value: 'hyojeong' },
  { label: '서진', value: 'seojin' },
];

interface DropdownProps {
  value?: string;
  disabled: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Dropdown = ({
  value,
  disabled,
  onChange,
  placeholder = '선택해주세요',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className={cn('text-body-m-15 flex h-[30.4rem] flex-col gap-[1.6rem]')}
    >
      <button
        disabled={disabled}
        type="button"
        className={cn(
          'flex justify-between rounded-[1.2rem] bg-gray-50 px-[1.6rem] py-[1.4rem]',
          isOpen && 'border-mint-200 bg-gray-100',
          disabled && 'cursor-not-allowed bg-gray-100 text-gray-500',
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value ?? placeholder}
        {isOpen ? (
          <IcChevronUpIcon width={24} height={24} />
        ) : (
          <IcChevronDownIcon width={24} height={24} />
        )}
      </button>
      {isOpen && !disabled && (
        <ul className="px-[1.6rem] py-[0.8rem]">
          {options.map((option) => (
            <OptionItem
              key={option.value}
              option={option.label}
              isSelected={value === option.value}
              onSelect={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
            />
          ))}
        </ul>
      )}
    </article>
  );
};

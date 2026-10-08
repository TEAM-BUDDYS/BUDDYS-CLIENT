'use client';

import type { Ref } from 'react';

import { cn } from '@/lib/cn';

interface SortOptionItemProps {
  ref?: Ref<HTMLButtonElement>;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const SortOptionItem = ({
  ref,
  label,
  isSelected,
  onSelect,
}: SortOptionItemProps) => {
  return (
    <li role="presentation">
      <button
        ref={ref}
        aria-selected={isSelected}
        className={cn(
          'text-caption-m-12 w-full rounded-lg py-2 pr-6 pl-2 text-left whitespace-nowrap text-gray-500',
          isSelected && 'bg-gray-50',
        )}
        onClick={onSelect}
        role="option"
        type="button"
      >
        {label}
      </button>
    </li>
  );
};

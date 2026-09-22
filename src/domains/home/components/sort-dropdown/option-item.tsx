'use client';

import { cn } from '@/lib/cn';

interface OptionItemProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const OptionItem = ({
  label,
  isSelected,
  onSelect,
}: OptionItemProps) => {
  return (
    <li>
      <button
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

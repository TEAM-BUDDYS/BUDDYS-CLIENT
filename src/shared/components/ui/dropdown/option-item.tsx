'use client';

import { cn } from '@/lib/cn';

interface OptionItemProps {
  option: string;
  isSelected: boolean;
  onSelect?: () => void;
}

export const OptionItem = ({
  option,
  isSelected,
  onSelect,
}: OptionItemProps) => {
  return (
    <li>
      <button
        aria-selected={isSelected}
        className={cn(
          'text-body-m-15 w-full rounded-lg px-4 py-3.5 text-left text-gray-500',
          isSelected && 'bg-mint-50 text-mint-300',
        )}
        onClick={onSelect}
        role="option"
        type="button"
      >
        {option}
      </button>
    </li>
  );
};

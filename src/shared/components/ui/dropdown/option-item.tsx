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
    <li
      className={cn(
        'text-body-m-15 flex-1 cursor-pointer rounded-[10px] px-[1.6rem] py-[1.4rem] text-gray-500',
        isSelected && 'bg-mint-50 text-black',
      )}
      onClick={onSelect}
    >
      {option}
    </li>
  );
};

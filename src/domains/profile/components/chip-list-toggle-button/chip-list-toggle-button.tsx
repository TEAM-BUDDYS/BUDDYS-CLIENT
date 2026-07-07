'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@shared/components/icons';
import { cn } from '@/lib/cn';

interface ChipListToggleButtonProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export const ChipListToggleButton = ({
  isOpen,
  onToggle,
}: ChipListToggleButtonProps) => {
  const handleClick = () => {
    onToggle(!isOpen);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? '태그 목록 접기' : '태그 목록 펼치기'}
      className={cn(
        'bg-mint-300 flex h-10 w-10 items-center justify-center rounded-full text-white',
        isOpen ? 'px-2 pt-1.75 pb-2.25' : 'px-2 pt-2.25 pb-1.75',
      )}
    >
      {isOpen ? (
        <ChevronUpIcon className="size-6" />
      ) : (
        <ChevronDownIcon className="size-6" />
      )}
    </button>
  );
};

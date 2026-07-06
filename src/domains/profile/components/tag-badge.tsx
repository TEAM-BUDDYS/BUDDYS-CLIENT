'use client';

import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@shared/components/icons';
import { cn } from '@/lib/cn';

interface TagBadgeProps {
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export function TagBadge({ defaultOpen = false, onToggle }: TagBadgeProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    onToggle?.(!isOpen);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-expanded={isOpen}
      className={cn(
        'bg-mint-300 flex h-10 w-10 items-center justify-center rounded-full text-white',
        isOpen ? 'px-4 pt-1.75 pb-2.25' : 'px-4 pt-2.25 pb-1.75',
      )}
    >
      {isOpen ? (
        <ChevronUpIcon className="size-6" />
      ) : (
        <ChevronDownIcon className="size-6" />
      )}
    </button>
  );
}

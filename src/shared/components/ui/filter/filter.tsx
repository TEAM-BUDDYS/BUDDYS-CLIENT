'use client';

import { cn } from '@/lib/cn';

const FILTER_STYLES = {
  default: {
    bg: 'bg-white',
    text: 'text-gray-500',
    border: 'border border-gray-100',
  },
  pressed: {
    bg: 'bg-gray-800',
    text: 'text-white',
    border: 'border border-transparent',
  },
};

export interface FilterProps {
  label: string;
  pressed: boolean;
  onPress: () => void;
}

export const Filter = ({ label, pressed, onPress }: FilterProps) => {
  const { bg, text, border } = FILTER_STYLES[pressed ? 'pressed' : 'default'];

  return (
    <button
      type="button"
      onClick={onPress}
      aria-pressed={pressed}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-[30px] px-4 py-2',
        bg,
        border,
      )}
    >
      <span className={cn('text-body-r-14', text)}>{label}</span>
    </button>
  );
};

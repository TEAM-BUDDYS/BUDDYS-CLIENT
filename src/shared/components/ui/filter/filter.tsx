'use client';

import { ChevronDownIcon } from '@/shared/components/icons';

const COLORS = {
  default: { bg: 'bg-white', text: 'text-gray-800' },
  pressed: { bg: 'bg-gray-800', text: 'text-white' },
};

export interface FilterProps {
  label: string;
  pressed: boolean;
  onPress: () => void;
}

export const Filter = ({ label, pressed, onPress }: FilterProps) => {
  const { bg, text } = COLORS[pressed ? 'pressed' : 'default'];

  return (
    <button
      type="button"
      onClick={onPress}
      aria-pressed={pressed}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-[30px] py-2 pr-3 pl-3.5 ${bg}`}
    >
      <span className={`text-caption-m-12 ${text}`}>{label}</span>
      <ChevronDownIcon className={`size-4.5 ${text}`} />
    </button>
  );
};

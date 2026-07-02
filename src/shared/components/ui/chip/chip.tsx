'use client';

import { cn } from '@/lib/cn';

const chipSize = {
  sm: 'px-3 text-body-r-14',
  md: 'px-4 text-body-m-15',
};

const chipBase =
  'inline-flex py-2 items-center justify-center rounded-[30px] border border-gray-200 bg-white text-gray-800';

const chipActive = 'border-mint-300 bg-mint-100 text-mint-300';

type ChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: 'sm' | 'md';
};

type ChipButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md';
  active?: boolean;
};

export function Chip({ size = 'sm', className, ...props }: ChipProps) {
  return (
    <span className={cn(chipBase, chipSize[size], className)} {...props} />
  );
}

export function ChipButton({
  size = 'sm',
  className,
  active = false,
  ...props
}: ChipButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        chipBase,
        chipSize[size],
        active ? chipActive : null,
        className,
      )}
      {...props}
    />
  );
}

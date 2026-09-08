import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface NicknameCheckButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'type'
> {
  className?: string;
}

export const NicknameCheckButton = ({
  className,
  ...props
}: NicknameCheckButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'text-caption-m-10 shrink-0 rounded-lg bg-gray-200 px-2 py-1.5 text-center text-gray-500 disabled:bg-gray-100 disabled:text-gray-300',
        className,
      )}
      {...props}
    >
      중복 확인
    </button>
  );
};

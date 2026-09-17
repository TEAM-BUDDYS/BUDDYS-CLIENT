import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface NicknameCheckButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'type'
> {
  className?: string;
  isLoading?: boolean;
}

export const NicknameCheckButton = ({
  className,
  disabled,
  isLoading = false,
  ...props
}: NicknameCheckButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'text-caption-m-10 relative shrink-0 rounded-lg bg-gray-200 px-2 py-1.5 text-center text-gray-500 disabled:bg-gray-100 disabled:text-gray-300',
        // 시각 크기는 유지하고 터치영역만 상하좌우 8px씩 확장합니다.
        'before:absolute before:-inset-2',
        "before:content-['']",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? '확인 중' : '중복 확인'}
    </button>
  );
};

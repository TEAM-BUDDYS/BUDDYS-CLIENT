'use client';

import { cn } from '@/lib/cn';
import { BookmarkIcon } from '@/shared/components/icons';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onClick: () => void;
  className?: string;
  'aria-busy'?: boolean;
  'aria-label'?: string;
  disabled?: boolean;
}

export const BookmarkButton = ({
  isBookmarked,
  onClick,
  className,
  'aria-busy': ariaBusy,
  'aria-label': ariaLabel,
  disabled,
}: BookmarkButtonProps) => {
  return (
    <button
      type="button"
      aria-busy={ariaBusy}
      aria-label={ariaLabel ?? (isBookmarked ? '북마크 해제' : '북마크 추가')}
      aria-pressed={isBookmarked}
      className={cn(
        'focus-visible:outline-mint-300 flex shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
        isBookmarked ? 'text-mint-300' : 'text-gray-200',
        className,
      )}
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <BookmarkIcon className={cn('size-6', isBookmarked && 'fill-current')} />
    </button>
  );
};

'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { BookmarkIcon } from '@/shared/components/icons';

type BookmarkOverlayVariant = 'card' | 'summary';

const bookmarkPosition = {
  card: 'top-2 right-2',
  summary: 'top-1.5 right-1.5',
} as const;

interface BookmarkContainerProps {
  isBookmarked: boolean;
  variant: BookmarkOverlayVariant;
  onBookmarkClick: () => void;
  children: ReactNode;
}

export const BookmarkContainer = ({
  isBookmarked,
  variant,
  onBookmarkClick,
  children,
}: BookmarkContainerProps) => {
  return (
    <div className="relative w-full">
      {children}

      <button
        type="button"
        className={cn(
          'absolute',
          bookmarkPosition[variant],
          isBookmarked ? 'text-mint-300' : 'text-gray-200',
        )}
        aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
        aria-pressed={isBookmarked}
        onClick={(event) => {
          event.stopPropagation();
          onBookmarkClick();
        }}
      >
        <BookmarkIcon
          className={cn('size-6', isBookmarked && 'fill-current')}
        />
      </button>
    </div>
  );
};

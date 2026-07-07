'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { BookmarkIcon } from '@/shared/components/icons';

type BookmarkOverlayVariant = 'card' | 'summary';

const bookmarkPosition = {
  card: {
    image: 'top-2 right-2',
    textOnly: 'top-1/2 right-0 -translate-y-1/2',
  },
  summary: {
    image: 'top-1.5 right-1.5',
    textOnly: 'top-1/2 right-0 -translate-y-1/2',
  },
} as const;

interface BookmarkContainerProps {
  hasImage: boolean;
  isBookmarked: boolean;
  variant?: BookmarkOverlayVariant;
  onBookmarkClick: () => void;
  children: ReactNode;
}

export const BookmarkOverlayContainer = ({
  hasImage,
  isBookmarked,
  variant = 'card',
  onBookmarkClick,
  children,
}: BookmarkContainerProps) => {
  return (
    <div className="relative">
      {children}

      <button
        type="button"
        className={cn(
          'absolute',
          hasImage
            ? bookmarkPosition[variant].image
            : bookmarkPosition[variant].textOnly,
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
          className={cn(
            hasImage ? 'size-5' : 'size-6',
            isBookmarked && 'fill-current',
          )}
        />
      </button>
    </div>
  );
};

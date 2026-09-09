'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { BookmarkButton } from '@/shared/components/ui';

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

      <BookmarkButton
        isBookmarked={isBookmarked}
        className={cn('absolute', bookmarkPosition[variant])}
        onClick={onBookmarkClick}
      />
    </div>
  );
};

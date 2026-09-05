'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';
import { Chip } from '@/shared/components/ui';
import type { Tag } from '@/types/tag';

import { ChipListToggleButton } from '../chip-list-toggle-button/chip-list-toggle-button';

interface TagChipGroupProps {
  tags: Tag[];
  minVisibleCount?: number;
  className?: string;
}

export const TagChipGroup = ({
  tags,
  minVisibleCount = 3,
  className,
}: TagChipGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (tags.length === 0) return null;

  const rowSize = Math.max(1, minVisibleCount);
  const hasMore = tags.length > rowSize;
  const visibleTags = hasMore && !isOpen ? tags.slice(0, rowSize) : tags;

  const rows: Tag[][] = [];
  for (let i = 0; i < visibleTags.length; i += rowSize) {
    rows.push(visibleTags.slice(i, i + rowSize));
  }

  return (
    <div className={cn('flex w-full flex-col gap-2.5', className)}>
      {rows.map((rowTags, rowIndex) => {
        const isLastRow = rowIndex === rows.length - 1;

        return (
          <div
            key={rowTags[0].id}
            className="flex items-center justify-center gap-2"
          >
            {rowTags.map((tag) => (
              <Chip key={tag.id} variant="lineMedium" active>
                {tag.name}
              </Chip>
            ))}
            {isLastRow && hasMore && (
              <ChipListToggleButton isOpen={isOpen} onToggle={setIsOpen} />
            )}
          </div>
        );
      })}
    </div>
  );
};

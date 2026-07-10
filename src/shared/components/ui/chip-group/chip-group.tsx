'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';
import { ChevronDownIcon, ChevronUpIcon } from '@/shared/components/icons';
import { ChipButton } from '@/shared/components/ui/chip/chip';
import type { Tag } from '@/types/tag';

const rowGapStyles = {
  sm: 'gap-y-2',
  md: 'gap-y-3',
};

export interface ChipGroupProps {
  tags: Tag[];
  selectedTagIds: number[];
  maxSelectionCount?: number;
  collapsedCount?: number;
  hasToggleButton?: boolean;
  wrap?: boolean;
  rowGap?: keyof typeof rowGapStyles;
  chipClassName?: string;
  onChange: (selectedTagIds: number[]) => void;
}

export const ChipGroup = ({
  tags,
  selectedTagIds = [],
  maxSelectionCount = 3,
  collapsedCount = 5,
  hasToggleButton = true,
  wrap = true,
  rowGap = 'sm',
  chipClassName,
  onChange,
}: ChipGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasToggle = hasToggleButton && tags.length > collapsedCount;
  const visibleTags =
    hasToggle && !isExpanded ? tags.slice(0, collapsedCount + 1) : tags;

  const handleTagClick = (tagId: number) => {
    const isSelected = selectedTagIds.includes(tagId);

    if (!isSelected && selectedTagIds.length >= maxSelectionCount) {
      return;
    }

    const nextSelectedTagIds = isSelected
      ? selectedTagIds.filter((selectedTagId) => selectedTagId !== tagId)
      : [...selectedTagIds, tagId];

    onChange(nextSelectedTagIds);
  };

  return (
    <div className="relative">
      <div
        className={cn(
          'flex min-w-0 gap-x-2',
          rowGapStyles[rowGap],
          hasToggle && !isExpanded && 'flex-nowrap overflow-hidden',
          (!hasToggle || isExpanded) && (wrap ? 'flex-wrap' : 'flex-nowrap'),
          hasToggle && isExpanded && 'pr-[77px]',
        )}
      >
        {visibleTags.map((tag) => {
          const isSelected = selectedTagIds.includes(tag.id);
          const isSelectionDisabled =
            !isSelected && selectedTagIds.length >= maxSelectionCount;

          return (
            <ChipButton
              key={tag.id}
              active={isSelected}
              className={chipClassName}
              aria-label={`${tag.name} 태그 ${isSelected ? '선택 해제' : '선택'}`}
              disabled={isSelectionDisabled}
              onClick={() => handleTagClick(tag.id)}
            >
              {tag.name}
            </ChipButton>
          );
        })}
      </div>

      {hasToggle && (
        <button
          type="button"
          aria-label={isExpanded ? '태그 목록 접기' : '태그 목록 펼치기'}
          aria-expanded={isExpanded}
          className="absolute top-0 right-0 flex h-[39px] w-[77px] items-center justify-end bg-gradient-to-r from-white/0 via-white to-white text-gray-800"
          onClick={() => {
            setIsExpanded((prevIsExpanded) => !prevIsExpanded);
          }}
        >
          {isExpanded ? (
            <ChevronUpIcon className="size-6 text-gray-500" />
          ) : (
            <ChevronDownIcon className="size-6 text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
};

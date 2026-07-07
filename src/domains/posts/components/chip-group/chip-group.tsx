'use client';

import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@/shared/components/icons';
import { ChipButton } from '@/shared/components/ui/chip/chip';

import type { Tag } from '../../model/tag';

interface ChipGroupProps {
  tags: Tag[];
  defaultSelectedTagIds?: number[];
  maxSelectionCount?: number;
  collapsedCount?: number;
  onChange?: (selectedTagIds: number[]) => void;
}

export const ChipGroup = ({
  tags,
  defaultSelectedTagIds = [],
  maxSelectionCount = 3,
  collapsedCount = 5,
  onChange,
}: ChipGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState(defaultSelectedTagIds);

  const visibleTags = isExpanded ? tags : tags.slice(0, collapsedCount);

  const handleTagClick = (tagId: number) => {
    const isSelected = selectedTagIds.includes(tagId);

    if (!isSelected && selectedTagIds.length >= maxSelectionCount) {
      return;
    }

    const nextSelectedTagIds = isSelected
      ? selectedTagIds.filter((selectedTagId) => selectedTagId !== tagId)
      : [...selectedTagIds, tagId];

    setSelectedTagIds(nextSelectedTagIds);
    onChange?.(nextSelectedTagIds);
  };

  return (
    <div className="relative">
      <div
        className={`flex min-w-0 gap-2 ${
          isExpanded ? 'flex-wrap pr-[77px]' : 'flex-nowrap overflow-hidden'
        }`}
      >
        {visibleTags.map((tag) => {
          const isSelected = selectedTagIds.includes(tag.id);
          const isSelectionDisabled =
            !isSelected && selectedTagIds.length >= maxSelectionCount;

          return (
            <ChipButton
              key={tag.id}
              active={isSelected}
              aria-label={`${tag.name} 태그 ${isSelected ? '선택 해제' : '선택'}`}
              disabled={isSelectionDisabled}
              onClick={() => handleTagClick(tag.id)}
            >
              {tag.name}
            </ChipButton>
          );
        })}
      </div>

      <button
        type="button"
        aria-label={isExpanded ? '태그 목록 접기' : '태그 목록 펼치기'}
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
    </div>
  );
};

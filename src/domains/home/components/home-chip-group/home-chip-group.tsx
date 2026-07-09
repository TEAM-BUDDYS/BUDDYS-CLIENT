'use client';

import { ChipButton } from '@/shared/components/ui';
import type { Tag } from '@/types/tag';

interface HomeChipGroupProps {
  tags: Tag[];
  selectedTagId: number | null;
  onChange: (tagId: number | null) => void;
}

export const HomeChipGroup = ({
  tags,
  selectedTagId,
  onChange,
}: HomeChipGroupProps) => {
  const handleTagClick = (tagId: number) => {
    onChange(selectedTagId === tagId ? null : tagId);
  };

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {tags.map((tag) => (
        <ChipButton
          key={tag.id}
          size="md"
          active={selectedTagId === tag.id}
          aria-label={`${tag.name} 태그 ${selectedTagId === tag.id ? '선택 해제' : '선택'}`}
          onClick={() => handleTagClick(tag.id)}
        >
          {tag.name}
        </ChipButton>
      ))}
    </div>
  );
};

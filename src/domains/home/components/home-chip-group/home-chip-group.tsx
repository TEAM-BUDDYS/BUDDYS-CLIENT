'use client';

import { ChipButton } from '@/shared/components/ui';
import type { Tag } from '@/types/tag';

interface HomeChipGroupProps {
  tags: Tag[];
  selectedTagId: number;
  onChange: (tagId: number) => void;
}

export const HomeChipGroup = ({
  tags,
  selectedTagId,
  onChange,
}: HomeChipGroupProps) => {
  const tagRows = Array.from(
    { length: Math.ceil(tags.length / 3) },
    (_, index) => tags.slice(index * 3, index * 3 + 3),
  );

  const handleTagClick = (tagId: number) => {
    if (selectedTagId === tagId) return;

    onChange(tagId);
  };

  return (
    <div className="flex flex-col gap-2">
      {tagRows.map((tagRow) => (
        <div key={tagRow.map((tag) => tag.id).join('-')} className="flex gap-2">
          {tagRow.map((tag) => (
            <ChipButton
              key={tag.id}
              size="md"
              active={selectedTagId === tag.id}
              aria-label={`${tag.name} 태그 ${selectedTagId === tag.id ? '선택됨' : '선택'}`}
              onClick={() => handleTagClick(tag.id)}
            >
              {tag.name}
            </ChipButton>
          ))}
        </div>
      ))}
    </div>
  );
};

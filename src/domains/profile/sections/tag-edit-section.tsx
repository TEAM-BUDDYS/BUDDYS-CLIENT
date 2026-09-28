'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';
import type { TagType } from '@/shared/api';
import { EditIcon } from '@/shared/components/icons';
import { Chip, ChipGroup, IconButton } from '@/shared/components/ui';
import type { Tag } from '@/types/tag';

import { TAG_EDIT_GROUPS } from '../model/tag-edit';

interface TagEditSectionProps {
  tagOptions: Record<TagType, Tag[]>;
  selectedTagIds: Record<TagType, number[]>;
  onChange: (tagType: TagType, tagIds: number[]) => void;
  className?: string;
}

export const TagEditSection = ({
  tagOptions,
  selectedTagIds,
  onChange,
  className,
}: TagEditSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const selectedTags = TAG_EDIT_GROUPS.flatMap(({ tagType }) =>
    tagOptions[tagType].filter((tag) =>
      selectedTagIds[tagType].includes(tag.id),
    ),
  );

  return (
    <section className={cn('flex w-full flex-col gap-4', className)}>
      <h2 className="text-body-sb-15 text-gray-800">태그 변경</h2>

      <div className="flex flex-wrap items-center gap-2">
        {selectedTags.map((tag) => (
          <Chip key={tag.id} variant="lineMedium" active>
            {tag.name}
          </Chip>
        ))}
        <IconButton
          variant="primary"
          icon={<EditIcon />}
          aria-label={isEditing ? '태그 편집 닫기' : '태그 편집'}
          aria-expanded={isEditing}
          className="size-10 px-2 pt-1.75 pb-2.25"
          onClick={() => setIsEditing((prevIsEditing) => !prevIsEditing)}
        />
      </div>

      {isEditing && (
        <div className="flex flex-col gap-6">
          {TAG_EDIT_GROUPS.map(({ tagType, title, maxSelectionCount }) => (
            <div key={tagType} className="flex flex-col gap-4">
              <p className="text-body-r-14 text-gray-500">
                {title} | 1~{maxSelectionCount}개 선택 (
                {selectedTagIds[tagType].length}/{maxSelectionCount})
              </p>

              <ChipGroup
                tags={tagOptions[tagType]}
                selectedTagIds={selectedTagIds[tagType]}
                maxSelectionCount={maxSelectionCount}
                hasToggleButton={false}
                rowGap="md"
                chipClassName="px-4.5 text-body-m-15"
                onChange={(tagIds) => onChange(tagType, tagIds)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

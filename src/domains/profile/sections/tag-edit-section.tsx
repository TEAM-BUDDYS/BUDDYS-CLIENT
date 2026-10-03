'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';
import type { TagType } from '@/shared/api';
import { EditIcon } from '@/shared/components/icons';
import { Chip, ChipGroup, IconButton } from '@/shared/components/ui';
import type { Tag } from '@/types/tag';

import { SortableTagChipList } from '../components/sortable-tag-chip-list/sortable-tag-chip-list';
import {
  getSelectedTagIdsByType,
  type SelectedTag,
  TAG_EDIT_GROUPS,
  updateSelectedTagsByType,
} from '../model/tag-edit';

interface TagEditSectionProps {
  tagOptions: Record<TagType, Tag[]>;
  selectedTags: SelectedTag[];
  onChange: (selectedTags: SelectedTag[]) => void;
  className?: string;
}

export const TagEditSection = ({
  tagOptions,
  selectedTags,
  onChange,
  className,
}: TagEditSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className={cn('flex w-full flex-col gap-10', className)}>
      <div className="flex flex-col gap-4">
        <h2 className="text-body-sb-15 text-gray-800">태그 변경</h2>

        {isEditing ? (
          <SortableTagChipList tags={selectedTags} onChange={onChange} />
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {selectedTags.map((tag) => (
              <Chip
                key={`${tag.tagType}-${tag.id}`}
                variant="lineMedium"
                active
              >
                {tag.name}
              </Chip>
            ))}
            <IconButton
              variant="primary"
              icon={<EditIcon />}
              aria-label="태그 편집"
              className="size-10 px-2 pt-1.75 pb-2.25"
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex flex-col gap-6">
          {TAG_EDIT_GROUPS.map(({ tagType, title, maxSelectionCount }) => {
            const selectedTagIds = getSelectedTagIdsByType(
              selectedTags,
              tagType,
            );

            return (
              <div key={tagType} className="flex flex-col gap-4">
                <p className="text-body-r-14 text-gray-500">
                  {title} | 1~{maxSelectionCount}개 선택 (
                  {selectedTagIds.length}/{maxSelectionCount})
                </p>

                <ChipGroup
                  tags={tagOptions[tagType]}
                  selectedTagIds={selectedTagIds}
                  maxSelectionCount={maxSelectionCount}
                  hasToggleButton={false}
                  rowGap="md"
                  chipClassName="px-4.5 text-body-m-15"
                  onChange={(nextTagIds) =>
                    onChange(
                      updateSelectedTagsByType(
                        selectedTags,
                        tagType,
                        nextTagIds,
                        tagOptions[tagType],
                      ),
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

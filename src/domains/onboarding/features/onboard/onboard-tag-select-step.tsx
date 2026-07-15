'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TAG_QUERY_OPTIONS, type TagType } from '@/shared/api';
import { ChipGroup } from '@/shared/components/ui';

interface OnboardTagSelectStepProps {
  title: string;
  description: string;
  tagType: TagType;
  selectedTagIds: number[];
  maxSelectionCount: number;
  onChange: (tagIds: number[]) => void;
}

export const OnboardTagSelectStep = ({
  title,
  description,
  tagType,
  selectedTagIds,
  maxSelectionCount,
  onChange,
}: OnboardTagSelectStepProps) => {
  const { data: tags } = useSuspenseQuery(TAG_QUERY_OPTIONS.LIST(tagType));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-title-b-20 text-gray-800">{title}</h1>
        <p className="text-body-sb-16 text-gray-500">{description}</p>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-body-r-14 text-gray-500">
          1~{maxSelectionCount}개 선택 ({selectedTagIds.length}/
          {maxSelectionCount})
        </p>

        <ChipGroup
          tags={tags}
          selectedTagIds={selectedTagIds}
          maxSelectionCount={maxSelectionCount}
          hasToggleButton={false}
          rowGap="md"
          chipClassName="px-4"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

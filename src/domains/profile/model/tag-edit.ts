import type { TagType } from '@/shared/api';
import type { Tag } from '@/types/tag';

export interface TagEditGroup {
  tagType: TagType;
  title: string;
  minSelectionCount: number;
  maxSelectionCount: number;
}

export interface SelectedTag extends Tag {
  tagType: TagType;
}

export const TAG_EDIT_GROUPS: TagEditGroup[] = [
  {
    tagType: 'ACTIVITY',
    title: '동행 유형',
    minSelectionCount: 1,
    maxSelectionCount: 3,
  },
  {
    tagType: 'INTEREST',
    title: '관심사',
    minSelectionCount: 1,
    maxSelectionCount: 3,
  },
  {
    tagType: 'TRAVEL_STYLE',
    title: '동행 스타일',
    minSelectionCount: 1,
    maxSelectionCount: 5,
  },
];

export const getSelectedTagIdsByType = (
  selectedTags: SelectedTag[],
  tagType: TagType,
) => selectedTags.filter((tag) => tag.tagType === tagType).map((tag) => tag.id);

export const updateSelectedTagsByType = (
  selectedTags: SelectedTag[],
  tagType: TagType,
  nextTagIds: number[],
  tagOptions: Tag[],
): SelectedTag[] => {
  const keptTags = selectedTags.filter(
    (tag) => tag.tagType !== tagType || nextTagIds.includes(tag.id),
  );
  const currentTagIds = getSelectedTagIdsByType(selectedTags, tagType);
  const addedTags = nextTagIds
    .filter((tagId) => !currentTagIds.includes(tagId))
    .flatMap((tagId) => {
      const tag = tagOptions.find((option) => option.id === tagId);

      return tag ? [{ ...tag, tagType }] : [];
    });

  return [...keptTags, ...addedTags];
};

import type { TagType } from '@/shared/api';

export interface TagEditGroup {
  tagType: TagType;
  title: string;
  maxSelectionCount: number;
}

export const TAG_EDIT_GROUPS: TagEditGroup[] = [
  { tagType: 'ACTIVITY', title: '동행 유형', maxSelectionCount: 3 },
  { tagType: 'INTEREST', title: '관심사', maxSelectionCount: 3 },
  { tagType: 'TRAVEL_STYLE', title: '동행 스타일', maxSelectionCount: 5 },
];

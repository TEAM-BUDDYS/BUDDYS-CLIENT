export type SavedCategory = 'PARTNER' | 'COURSE' | 'PLACE' | 'MAGAZINE';

export const savedCategoryItems = [
  { key: 'PARTNER', label: '동행' },
  { key: 'COURSE', label: '코스' },
  { key: 'PLACE', label: '장소' },
  { key: 'MAGAZINE', label: '매거진' },
] satisfies {
  key: SavedCategory;
  label: string;
}[];

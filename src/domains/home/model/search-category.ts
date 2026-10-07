export type SearchCategory = 'PARTNER' | 'COURSE' | 'BUDDY';

export const searchCategoryItems = [
  { key: 'PARTNER', label: '동행' },
  { key: 'COURSE', label: '코스' },
  { key: 'BUDDY', label: '버디' },
] satisfies {
  key: SearchCategory;
  label: string;
}[];

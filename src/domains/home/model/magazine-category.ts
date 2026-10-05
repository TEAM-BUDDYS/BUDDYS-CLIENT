export type MagazineCategory =
  | 'SUPPORT'
  | 'DEPARTURE_PREP'
  | 'LOCAL_SETTLEMENT'
  | 'TRAVEL';

export const magazineCategoryItems = [
  { key: 'SUPPORT', label: '지원' },
  { key: 'DEPARTURE_PREP', label: '출국 준비' },
  { key: 'LOCAL_SETTLEMENT', label: '현지 정착' },
  { key: 'TRAVEL', label: '여행' },
] satisfies {
  key: MagazineCategory;
  label: string;
}[];

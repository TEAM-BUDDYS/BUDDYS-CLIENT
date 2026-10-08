export type BuddyFilterKey =
  | 'country'
  | 'date'
  | 'age'
  | 'gender'
  | 'buddyType'
  | 'verification';

export const buddyFilterItems = [
  { key: 'country', label: '국가' },
  { key: 'date', label: '날짜' },
  { key: 'age', label: '나이' },
  { key: 'gender', label: '성별' },
  { key: 'buddyType', label: '동행 유형' },
  { key: 'verification', label: '인증 상태' },
] satisfies {
  key: BuddyFilterKey;
  label: string;
}[];

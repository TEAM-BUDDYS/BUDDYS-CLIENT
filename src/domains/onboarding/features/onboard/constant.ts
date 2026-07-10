import type { GenderType } from '@/types/gender';

export const TOTAL_PROGRESS_STEP = 5;

export const GENDER_OPTIONS = [
  { label: '남자', value: 'MALE' },
  { label: '여자', value: 'FEMALE' },
] satisfies { label: string; value: GenderType }[];

export const ONBOARD_COUNTRY_OPTIONS = [
  { id: 1, name: '프랑스' },
  { id: 2, name: '미국' },
  { id: 3, name: '영국' },
  { id: 5, name: '일본' },
  { id: 6, name: '호주' },
] as const;

export const INTEREST_CITY_OPTIONS_BY_COUNTRY_ID = {
  1: [{ id: 1001, name: 'Paris', koreanName: '파리' }],
  2: [{ id: 2001, name: 'New York', koreanName: '뉴욕' }],
  3: [{ id: 3001, name: 'London', koreanName: '런던' }],
  4: [{ id: 4001, name: 'Berlin', koreanName: '베를린' }],
  5: [{ id: 5001, name: 'Tokyo', koreanName: '도쿄' }],
  6: [{ id: 6001, name: 'Sydney', koreanName: '시드니' }],
} as const;

export const EXCHANGE_SCHOOL_OPTIONS_BY_COUNTRY_ID = {
  1: [{ id: 1001, name: '소르본 대학교' }],
  2: [{ id: 2001, name: '뉴욕 대학교' }],
  3: [{ id: 3001, name: '런던 대학교' }],
  4: [{ id: 4001, name: '베를린 자유대학교' }],
  5: [{ id: 5001, name: '와세다 대학교' }],
  6: [{ id: 6001, name: '시드니 대학교' }],
} as const;

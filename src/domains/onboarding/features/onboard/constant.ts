import type { GenderType } from '@/types/gender';

export const TOTAL_PROGRESS_STEP = 5;

export const GENDER_OPTIONS = [
  { label: '남자', value: 'MALE' },
  { label: '여자', value: 'FEMALE' },
] satisfies { label: string; value: GenderType }[];

export const INTEREST_CITY_OPTIONS_BY_COUNTRY_ID = {
  2: [{ id: 2001, name: 'New York', koreanName: '뉴욕' }],
} as const;

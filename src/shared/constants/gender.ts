import type { GenderType } from '@/types/gender';

export const GENDER_OPTIONS = [
  { label: '남자', value: 'MALE' },
  { label: '여자', value: 'FEMALE' },
] satisfies { label: string; value: GenderType }[];

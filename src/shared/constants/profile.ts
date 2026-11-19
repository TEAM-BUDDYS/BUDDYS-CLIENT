import type { GenderType } from '@/types/gender';

export const GENDER_OPTIONS = [
  { label: '남자', value: 'MALE' },
  { label: '여자', value: 'FEMALE' },
] satisfies { label: string; value: GenderType }[];

export const NICKNAME_MAX_LENGTH = 14;

export const PROFILE_BIO_MAX_LENGTH = 69;

export const PROFILE_TAG_SELECTION_LIMITS = {
  ACTIVITY: { minSelectionCount: 1, maxSelectionCount: 3 },
  INTEREST: { minSelectionCount: 1, maxSelectionCount: 2 },
  TRAVEL_STYLE: { minSelectionCount: 1, maxSelectionCount: 2 },
} as const;

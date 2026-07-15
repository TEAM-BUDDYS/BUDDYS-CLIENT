import type { GenderType } from '@/types/gender';

import type {
  AgeConditionType,
  CompanionType,
  RecruitmentCountType,
} from './post-form';

export const POST_AGE_CONDITION_LABELS = {
  EARLY_20S: '20대 초반',
  LATE_20S: '20대 후반',
  MID_20S: '20대 중반',
  OVER_30S: '30대 이상',
} satisfies Record<AgeConditionType, string>;

export const POST_GENDER_CONDITION_LABELS = {
  FEMALE: '여자',
  MALE: '남자',
} satisfies Record<GenderType, string>;

export const POST_COMPANION_TYPE_LABELS = {
  ACCOMMODATION_SHARE: '숙박 공유',
  DAILY_LIFE: '생활 동행',
  FULL_TRIP: '여행 전체 동행',
  GROUP_PURCHASE: '공동 구매',
  MEAL: '식사 동행',
  PARTIAL_TRIP: '여행 부분 동행',
  TOUR: '투어 동행',
} satisfies Record<CompanionType, string>;

export const POST_RECRUITMENT_COUNT_LABELS = {
  FOUR_OR_MORE: '4인 이상',
  ONE: '1인',
  THREE: '3인',
  TWO: '2인',
  UNDECIDED: '미정',
} satisfies Record<RecruitmentCountType, string>;

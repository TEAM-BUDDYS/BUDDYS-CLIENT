import type { GenderType } from '@/types/gender';

export type AgeConditionType =
  | 'EARLY_20S'
  | 'MID_20S'
  | 'LATE_20S'
  | 'OVER_30S';

export type CompanionType =
  | 'FULL_TRIP'
  | 'PARTIAL_TRIP'
  | 'ACCOMMODATION_SHARE'
  | 'TOUR'
  | 'MEAL'
  | 'DAILY_LIFE'
  | 'GROUP_PURCHASE';

export type RecruitmentCountType =
  | 'UNDECIDED'
  | 'ONE'
  | 'TWO'
  | 'THREE'
  | 'FOUR_OR_MORE';

export interface PostFormPayload {
  countryId: number;
  cityId: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  ageConditions: AgeConditionType[];
  gender: GenderType;
  companionType: CompanionType;
  recruitmentCountType: RecruitmentCountType;
  tagIds: number[];
  imageUrls: string[];
}

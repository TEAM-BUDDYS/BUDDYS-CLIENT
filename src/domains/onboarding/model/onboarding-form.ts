import type { GenderType } from '@/types/gender';

export interface OnboardingFormPayload {
  interestCountryId: number;
  interestCityId: number;

  exchangeCountryId: number | null;
  exchangeUniversity: string | null;
  exchangeStartDate: string | null;
  exchangeEndDate: string | null;

  activityTagIds: number[];
  interestTagIds: number[];
  travelStyleTagIds: number[];

  nickname: string;
  gender: GenderType;
  birthDate: string;
  bio: string;
  profileImageUrl: string;
}

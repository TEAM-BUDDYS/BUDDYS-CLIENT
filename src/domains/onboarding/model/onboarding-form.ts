export type GenderType = 'FEMALE' | 'MALE';

export interface OnboardingFormPayload {
  interestCountryId: number;
  interestCityId: number;

  exchangeCountryId: number;
  exchangeUniversity: string;
  exchangeStartDate: string;
  exchangeEndDate: string;

  activityTagIds: number[];
  interestTagIds: number[];
  travelStyleTagIds: number[];

  nickname: string;
  gender: GenderType;
  birthDate: string;
  bio: string;
  profileImageUrl: string;
}

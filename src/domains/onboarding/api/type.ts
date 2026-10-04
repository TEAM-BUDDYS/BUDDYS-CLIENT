import type { components, operations } from '@/types/schema';

export type CompleteOnboardingRequest =
  components['schemas']['OnboardingRequest'];
export type CompleteOnboardingResponse =
  components['schemas']['BaseResponseOnboardingResponse'];

export type GetRecommendedUsersParams =
  operations['getRecommendedUsers']['parameters']['query'];
export type GetRecommendedUsersResponse =
  components['schemas']['BaseResponseRecommendedUserListResponse'];
export type RecommendedUser = components['schemas']['RecommendedUserResponse'];

export type SearchUniversitiesParams =
  operations['searchUniversities']['parameters']['query'];
export type SearchUniversitiesResponse =
  components['schemas']['BaseResponseUniversityListResponse'];

export type CheckNicknameParams =
  operations['checkNicknameAvailability']['parameters']['query'];

export type CheckNicknameResponse = Omit<
  components['schemas']['BaseResponse'],
  'data'
> & {
  data: {
    available: boolean;
  };
};

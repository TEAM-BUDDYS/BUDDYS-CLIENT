import type { components, operations } from '@/types/schema';

export type CompleteOnboardingRequest =
  components['schemas']['OnboardingRequest'];
export type CompleteOnboardingResponse =
  components['schemas']['BaseResponseOnboardingResponse'];

export type SearchUniversitiesParams =
  operations['searchUniversities']['parameters']['query'];
export type SearchUniversitiesResponse =
  components['schemas']['BaseResponseUniversityListResponse'];

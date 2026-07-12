import type { components, operations } from '@/types/schema';

export type CompleteOnboardingRequest =
  components['schemas']['OnboardingRequest'];
export type CompleteOnboardingResponse =
  components['schemas']['BaseResponseOnboardingResponse'];

export type GetTagsParams = operations['getTags']['parameters']['path'];
export type GetTagsResponse =
  components['schemas']['BaseResponseListTagResponse'];

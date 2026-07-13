import { mutationOptions } from '@tanstack/react-query';

import { apiClient, END_POINT } from '@/shared/api';

import type {
  CompleteOnboardingRequest,
  CompleteOnboardingResponse,
} from './type';

const completeOnboarding = async (body: CompleteOnboardingRequest) => {
  return apiClient
    .patch(END_POINT.USER.ONBOARDING, {
      json: body,
    })
    .json<CompleteOnboardingResponse>();
};

export const ONBOARDING_MUTATION_OPTIONS = {
  COMPLETE: () =>
    mutationOptions({
      mutationFn: (body: CompleteOnboardingRequest) => completeOnboarding(body),
    }),
};

import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { apiClient, END_POINT, TAG_QUERY_KEY } from '@/shared/api';

import type {
  CompleteOnboardingRequest,
  CompleteOnboardingResponse,
  GetTagsParams,
  GetTagsResponse,
} from './type';

const completeOnboarding = async (body: CompleteOnboardingRequest) => {
  return apiClient
    .patch(END_POINT.USER.ONBOARDING, {
      json: body,
    })
    .json<CompleteOnboardingResponse>();
};

const getTags = async (type: GetTagsParams['type']) => {
  return apiClient.get(END_POINT.TAG.LIST(type)).json<GetTagsResponse>();
};

export const ONBOARDING_QUERY_OPTIONS = {
  TAGS: (type: GetTagsParams['type']) =>
    queryOptions({
      queryKey: TAG_QUERY_KEY.LIST(type),
      queryFn: () => getTags(type),
    }),
};

export const ONBOARDING_MUTATION_OPTIONS = {
  COMPLETE: () =>
    mutationOptions({
      mutationFn: (body: CompleteOnboardingRequest) => completeOnboarding(body),
    }),
};

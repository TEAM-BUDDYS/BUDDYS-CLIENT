import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { apiClient, COUNTRY_QUERY_KEY, END_POINT } from '@/shared/api';

import type {
  CompleteOnboardingRequest,
  CompleteOnboardingResponse,
  SearchUniversitiesParams,
  SearchUniversitiesResponse,
} from './type';

const completeOnboarding = async (body: CompleteOnboardingRequest) => {
  return apiClient
    .patch(END_POINT.USER.ONBOARDING, {
      json: body,
    })
    .json<CompleteOnboardingResponse>();
};

const searchUniversities = async (
  countryId: number,
  params: SearchUniversitiesParams,
) => {
  return apiClient
    .get(END_POINT.COUNTRY.UNIVERSITY_SEARCH(countryId), {
      searchParams: params,
    })
    .json<SearchUniversitiesResponse>();
};

export const ONBOARDING_QUERY_OPTIONS = {
  UNIVERSITY_SEARCH: (countryId: number, keyword: string) =>
    queryOptions({
      queryKey: COUNTRY_QUERY_KEY.UNIVERSITY_SEARCH(countryId, { keyword }),
      queryFn: () => searchUniversities(countryId, { keyword }),
    }),
};

export const ONBOARDING_MUTATION_OPTIONS = {
  COMPLETE: () =>
    mutationOptions({
      mutationFn: (body: CompleteOnboardingRequest) => completeOnboarding(body),
    }),
};

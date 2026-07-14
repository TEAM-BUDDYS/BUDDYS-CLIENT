import type { components, operations } from '@/types/schema';

export type SearchCitiesParams =
  operations['searchCities']['parameters']['query'];
export type SearchCitiesResponse =
  components['schemas']['BaseResponseCityListResponse'];

export type City = components['schemas']['CityResponse'];

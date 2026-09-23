import type { components, operations } from '@/types/schema';

export type SearchCitiesParams =
  operations['searchCities']['parameters']['query'];
export type SearchCitiesResponse =
  components['schemas']['BaseResponseCityListResponse'];

type CityResponse = components['schemas']['CityResponse'];

export type City = Required<Pick<CityResponse, 'id' | 'name'>> &
  Pick<CityResponse, 'koreanName'>;

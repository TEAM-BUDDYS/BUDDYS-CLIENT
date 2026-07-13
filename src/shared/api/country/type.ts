import type { components, operations } from '@/types/schema';

export type GetCountriesParams =
  operations['getCountries']['parameters']['query'];
export type GetCountriesResponse =
  components['schemas']['BaseResponseCountryListResponse'];

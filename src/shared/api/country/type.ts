import type { components, operations } from '@/types/schema';

export type GetCountriesParams =
  operations['getCountries']['parameters']['query'];
export type GetCountriesResponse =
  components['schemas']['BaseResponseCountryListResponse'];

export interface Country {
  id: number;
  name: string;
}

export interface CountryPage {
  countries: Country[];
  page: number;
  hasNext: boolean;
}

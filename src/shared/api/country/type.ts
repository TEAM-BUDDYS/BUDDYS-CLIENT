import type { components, operations } from '@/types/schema';

export type GetCountriesParams =
  operations['getCountries']['parameters']['query'];
export type GetCountriesResponse =
  components['schemas']['BaseResponseCountryListResponse'];
export type SearchCountriesParams =
  operations['searchCountries']['parameters']['query'];
export type SearchCountriesResponse =
  components['schemas']['BaseResponseCountryListResponse'];

type CountryResponse = components['schemas']['CountryResponse'];

export type Country = Required<Pick<CountryResponse, 'id' | 'name'>>;

export interface CountryPage {
  countries: Country[];
  page: number;
  hasNext: boolean;
}

import type { City, Country } from '@/shared/api';

export type CourseCreateLocationStep = 1 | 2;

export interface CourseCreateCityOption extends City {
  countryId: number;
}

export interface CourseCreateLocationValue {
  countries: Country[];
  cities: CourseCreateCityOption[];
}

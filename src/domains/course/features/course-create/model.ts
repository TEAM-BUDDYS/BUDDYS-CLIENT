import type { City, Country } from '@/shared/api';

export type CourseCreateLocationStep = 1 | 2;

export interface CourseCreateCityOption
  extends Required<Pick<City, 'id' | 'name'>>, Pick<City, 'koreanName'> {
  countryId: number;
}

export interface CourseCreateLocationValue {
  countries: Country[];
  cities: CourseCreateCityOption[];
}

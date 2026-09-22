import type { City, Country } from '@/shared/api';

export type CourseCreateScreen =
  | 'country'
  | 'city'
  | 'date'
  | 'duration'
  | 'detail';

export interface CourseCreateCityOption
  extends Required<Pick<City, 'id' | 'name'>>, Pick<City, 'koreanName'> {
  countryId: number;
}

export interface CourseCreateDetailFormState {
  title: string;
  content: string;
  activityTagIds: number[];
  interestTagIds: number[];
  travelStyleTagIds: number[];
}

export interface CourseCreateBasicInfoValue {
  countries: Country[];
  cities: CourseCreateCityOption[];
  durationDays: number;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  detail: CourseCreateDetailFormState;
}

import type { City, Country } from '@/shared/api';

export type CourseCreateScreen = 'country' | 'city' | 'date' | 'detail';

export interface CourseCreateCityOption extends City {
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
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  detail: CourseCreateDetailFormState;
}

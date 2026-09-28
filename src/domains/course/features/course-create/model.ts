import type { City, Country } from '@/shared/api';
import type { components } from '@/types/schema';

import type { BookmarkedPlace, Place } from '../../api/type';

type CourseDayRequest = components['schemas']['CourseDayRequest'];

export type CourseCreateScreen =
  | 'country'
  | 'city'
  | 'date'
  | 'duration'
  | 'detail'
  | 'itinerary';

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
  durationDays: number;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  detail: CourseCreateDetailFormState;
}

export interface CourseCreateImageDraft {
  file: File;
  previewUrl: string;
}

export interface CourseCreateDayFormState {
  dayNumber: CourseDayRequest['dayNumber'];
  date?: CourseDayRequest['date'];
  places: (Place | BookmarkedPlace)[];
  images: CourseCreateImageDraft[];
  memo: NonNullable<CourseDayRequest['memo']>;
  cost: NonNullable<CourseDayRequest['cost']> | null;
}

export interface CourseCreateValue extends CourseCreateBasicInfoValue {
  days: CourseCreateDayFormState[];
}

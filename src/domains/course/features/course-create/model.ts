import type { City, Country } from '@/shared/api';
import type { components } from '@/types/schema';

import type { CourseCompanion, Place } from '../../api/type';

type CourseDayRequest = components['schemas']['CourseDayRequest'];
type CourseFlightRequest = components['schemas']['CourseFlightRequest'];

export type CourseCreateScreen =
  | 'country'
  | 'city'
  | 'date'
  | 'duration'
  | 'detail'
  | 'itinerary'
  | 'companion';

export interface CourseCreateCityOption extends City {
  countryId: number | null;
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

export type CourseCreateImageDraft =
  | {
      type: 'existing';
      imageUrl: string;
      previewUrl: string;
    }
  | {
      type: 'new';
      file: File;
      previewUrl: string;
    };

export interface CourseCreateFlightFormState {
  airline: CourseFlightRequest['airline'];
  flightNumber: NonNullable<CourseFlightRequest['flightNumber']>;
  departureAirport: CourseFlightRequest['departureAirport'];
  departureTime: string;
  arrivalAirport: CourseFlightRequest['arrivalAirport'];
  arrivalTime: string;
}

export interface CourseCreatePlace {
  placeId: Place['placeId'];
  name: Place['name'];
  category?: Place['category'];
  address: Place['address'];
  latitude: Place['latitude'];
  longitude: Place['longitude'];
  country?: Place['country'];
  city?: Place['city'];
}

export interface CourseCreateDayFormState {
  dayNumber: CourseDayRequest['dayNumber'];
  date?: CourseDayRequest['date'];
  places: CourseCreatePlace[];
  images: CourseCreateImageDraft[];
  memo: NonNullable<CourseDayRequest['memo']>;
  cost: NonNullable<CourseDayRequest['cost']> | null;
  flights: CourseCreateFlightFormState[];
}

export interface CourseCreateValue extends CourseCreateBasicInfoValue {
  days: CourseCreateDayFormState[];
  companionUserIds: NonNullable<
    components['schemas']['CreateCourseRequest']['companionUserIds']
  >;
}

export interface CourseCreateInitialValue extends CourseCreateBasicInfoValue {
  courseId: number;
  days: CourseCreateDayFormState[];
}

export type CourseCreateCompanion = CourseCompanion;

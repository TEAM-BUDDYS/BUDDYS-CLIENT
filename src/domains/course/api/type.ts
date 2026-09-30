import type { components, operations } from '@/types/schema';

export type Airline = components['schemas']['AirlineResponse'];
export type SearchAirlinesParams = NonNullable<
  operations['searchAirlines']['parameters']['query']
>;
export type SearchAirlinesResponse =
  components['schemas']['BaseResponseAirlineListResponse'];
export type CourseDetail = components['schemas']['CourseDetailResponse'];
export type CourseDay = components['schemas']['DayResponse'];
export type Place = components['schemas']['PlaceResponse'];
export type BookmarkedPlace = components['schemas']['BookmarkedPlaceResponse'];

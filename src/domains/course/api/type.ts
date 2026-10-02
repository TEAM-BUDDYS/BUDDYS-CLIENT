import type { components, operations } from '@/types/schema';

export type CourseDay = components['schemas']['DayResponse'];
export type Place = components['schemas']['PlaceResponse'];
export type BookmarkedPlace = components['schemas']['BookmarkedPlaceResponse'];
export type GetNearbyPlacesParams = NonNullable<
  operations['getNearbyPlaces']['parameters']['query']
>;
export type GetNearbyPlacesResponse =
  components['schemas']['BaseResponsePlaceSearchResponse'];

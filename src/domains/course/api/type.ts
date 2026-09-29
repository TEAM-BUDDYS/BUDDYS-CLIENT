import type { components, operations } from '@/types/schema';

export type CourseDetail = components['schemas']['CourseDetailResponse'];
export type CourseDay = components['schemas']['DayResponse'];
export type Place = components['schemas']['PlaceResponse'];
export type BookmarkedPlace = components['schemas']['BookmarkedPlaceResponse'];

type SearchPlacesQuery = NonNullable<
  operations['searchPlaces']['parameters']['query']
>;

export type SearchPlacesParams = Omit<SearchPlacesQuery, 'pageToken'> & {
  query: string;
};
export type SearchPlacesPageParams = SearchPlacesParams &
  Pick<SearchPlacesQuery, 'pageToken'>;
export type SearchPlacesResponse =
  components['schemas']['BaseResponsePlaceSearchResponse'];

type GetBookmarkedPlacesQuery = NonNullable<
  operations['getBookmarkedPlaces']['parameters']['query']
>;

export type GetBookmarkedPlacesParams = Omit<GetBookmarkedPlacesQuery, 'page'>;
export type GetBookmarkedPlacesPageParams = GetBookmarkedPlacesParams &
  Pick<GetBookmarkedPlacesQuery, 'page'>;
export type GetBookmarkedPlacesResponse =
  components['schemas']['BaseResponseBookmarkedPlaceListResponse'];

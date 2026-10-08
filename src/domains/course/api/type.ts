import type { components, operations } from '@/types/schema';

export type Airline = components['schemas']['AirlineResponse'];
export type SearchAirlinesParams = NonNullable<
  operations['searchAirlines']['parameters']['query']
>;
export type SearchAirlinesResponse =
  components['schemas']['BaseResponseAirlineListResponse'];
export type CourseCommentPage =
  components['schemas']['CourseCommentListResponse'];
export type CourseDetail = components['schemas']['CourseDetailResponse'];
export type CreateCourseRequest = components['schemas']['CreateCourseRequest'];
export type CreateCourseResponse =
  components['schemas']['BaseResponseCreateCourseResponse'];
export type CourseErrorResponse = components['schemas']['BaseResponse'];
export type CreateCourseCommentRequest =
  components['schemas']['CreateCommentRequest'];
export type CreateCourseCommentResponse =
  components['schemas']['BaseResponseCreateCourseCommentResponse'];
export type GetCourseCommentsParams = NonNullable<
  operations['getComments_1']['parameters']['query']
>;
export type GetCourseCommentsResponse =
  components['schemas']['BaseResponseCourseCommentListResponse'];
export type GetCourseDetailResponse =
  components['schemas']['BaseResponseCourseDetailResponse'];
export type CourseBookmark = components['schemas']['CourseBookmarkResponse'];
export type UpdateCourseBookmarkResponse =
  components['schemas']['BaseResponseCourseBookmarkResponse'];
export type CourseDay = components['schemas']['DayResponse'];
export type CourseCompanion = components['schemas']['UserSummaryResponse'];
export type Place = components['schemas']['PlaceResponse'];
export type BookmarkedPlace = components['schemas']['BookmarkedPlaceResponse'];
export type UpdatePlaceBookmarkResponse =
  components['schemas']['BaseResponsePlaceBookmarkResponse'];
export type GetNearbyPlacesParams = NonNullable<
  operations['getNearbyPlaces']['parameters']['query']
>;
export type GetNearbyPlacesResponse =
  components['schemas']['BaseResponsePlaceSearchResponse'];

export type SearchCourseCompanionsParams = NonNullable<
  operations['searchUsers']['parameters']['query']
>;
export type SearchCourseCompanionsResponse =
  components['schemas']['BaseResponse'];
export interface SearchCourseCompanionsPage {
  users: CourseCompanion[];
  page: number;
  size: number;
  hasNext: boolean;
}

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
export type GetBookmarkedPlaceMarkersParams = NonNullable<
  operations['getBookmarkedPlaceMarkers']['parameters']['query']
>;
export type GetBookmarkedPlaceMarkersResponse =
  components['schemas']['BaseResponseBookmarkedPlaceMarkersResponse'];
export type BookmarkedPlaceMarkers =
  components['schemas']['BookmarkedPlaceMarkersResponse'];

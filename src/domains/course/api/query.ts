import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import {
  AIRLINE_QUERY_KEY,
  apiClient,
  createSearchParams,
  END_POINT,
  PLACE_QUERY_KEY,
} from '@/shared/api';

import type {
  BookmarkedPlace,
  GetBookmarkedPlaceMarkersParams,
  GetBookmarkedPlaceMarkersResponse,
  GetBookmarkedPlacesPageParams,
  GetBookmarkedPlacesParams,
  GetBookmarkedPlacesResponse,
  GetNearbyPlacesParams,
  GetNearbyPlacesResponse,
  Place,
  SearchAirlinesParams,
  SearchAirlinesResponse,
  SearchPlacesPageParams,
  SearchPlacesParams,
  SearchPlacesResponse,
  UpdatePlaceBookmarkResponse,
} from './type';

export interface UpdatePlaceBookmarkVariables {
  placeId: string;
  nextBookmarked: boolean;
}

const updatePlaceBookmark = async ({
  placeId,
  nextBookmarked,
}: UpdatePlaceBookmarkVariables) => {
  const endpoint = END_POINT.PLACE.BOOKMARK(placeId);
  const response = await (
    nextBookmarked ? apiClient.post(endpoint) : apiClient.delete(endpoint)
  ).json<UpdatePlaceBookmarkResponse>();

  if (!response.success || typeof response.data?.bookmarked !== 'boolean') {
    throw new Error(
      response.message ||
        (nextBookmarked
          ? '장소를 저장하지 못했습니다.'
          : '장소 저장을 취소하지 못했습니다.'),
    );
  }

  return response.data.bookmarked;
};

const getNearbyPlaces = async (
  params: GetNearbyPlacesParams,
): Promise<Place[]> => {
  const response = await apiClient
    .get(END_POINT.PLACE.NEARBY, {
      searchParams: createSearchParams(params),
    })
    .json<GetNearbyPlacesResponse>();

  if (!response.success || !response.data) {
    throw new Error(response.message || '근처 장소를 불러오지 못했습니다.');
  }

  return response.data.places ?? [];
};

const searchAirlines = async (
  params: SearchAirlinesParams,
  signal?: AbortSignal,
) => {
  const response = await apiClient
    .get(END_POINT.AIRLINE.SEARCH, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<SearchAirlinesResponse>();

  if (!response.success || !response.data) {
    throw new Error(response.message || '항공사를 불러오지 못했습니다.');
  }

  return response.data;
};

type PlaceCategory = NonNullable<Place['category']>;

const PLACE_CATEGORIES = new Set<PlaceCategory>([
  'RESTAURANT',
  'CAFE',
  'TOURISM',
  'ACCOMMODATION',
  'ETC',
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isNullableString = (value: unknown) =>
  value === null || typeof value === 'string';

const isNullableNumber = (value: unknown) =>
  value === null || (typeof value === 'number' && Number.isFinite(value));

const isPlaceCategory = (value: unknown): value is PlaceCategory =>
  typeof value === 'string' && PLACE_CATEGORIES.has(value as PlaceCategory);

const isPlace = (value: unknown): value is Place => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.placeId === 'string' &&
    isNullableString(value.name) &&
    (value.category === undefined || isPlaceCategory(value.category)) &&
    isNullableString(value.address) &&
    isNullableNumber(value.latitude) &&
    isNullableNumber(value.longitude) &&
    typeof value.bookmarked === 'boolean' &&
    (value.photoUrl === undefined || isNullableString(value.photoUrl)) &&
    typeof value.googleMapsUrl === 'string' &&
    isNullableString(value.country) &&
    isNullableString(value.city)
  );
};

const isBookmarkedPlace = (value: unknown): value is BookmarkedPlace => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.placeId === 'string' &&
    typeof value.name === 'string' &&
    isPlaceCategory(value.category) &&
    isNullableString(value.address) &&
    isNullableNumber(value.latitude) &&
    isNullableNumber(value.longitude) &&
    typeof value.photoUrl === 'string' &&
    typeof value.googleMapsUrl === 'string' &&
    typeof value.bookmarkedAt === 'string'
  );
};

const searchPlaces = async (
  params: SearchPlacesPageParams,
  signal?: AbortSignal,
) => {
  const response = await apiClient
    .get(END_POINT.PLACE.SEARCH, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<SearchPlacesResponse>();

  const data = response.data;

  if (
    !response.success ||
    !data ||
    (data.places !== undefined &&
      (!Array.isArray(data.places) || !data.places.every(isPlace))) ||
    (data.nextPageToken !== undefined && !isNullableString(data.nextPageToken))
  ) {
    throw new Error(
      response.message || '장소 검색 결과를 불러오지 못했습니다.',
    );
  }

  return {
    places: data.places ?? [],
    nextPageToken: data.nextPageToken ?? null,
  };
};

const getBookmarkedPlaces = async (
  params: GetBookmarkedPlacesPageParams,
  signal?: AbortSignal,
) => {
  const response = await apiClient
    .get(END_POINT.PLACE.BOOKMARKS, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<GetBookmarkedPlacesResponse>();

  const data = response.data;

  if (
    !response.success ||
    !data ||
    !Array.isArray(data.places) ||
    !data.places.every(isBookmarkedPlace) ||
    !Number.isInteger(data.page) ||
    !Number.isInteger(data.size) ||
    typeof data.hasNext !== 'boolean'
  ) {
    throw new Error(
      response.message || '최근 저장한 장소를 불러오지 못했습니다.',
    );
  }

  return data;
};

const getBookmarkedPlaceMarkers = async (
  params: GetBookmarkedPlaceMarkersParams,
  signal?: AbortSignal,
) => {
  const response = await apiClient
    .get(END_POINT.PLACE.BOOKMARK_MARKERS, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<GetBookmarkedPlaceMarkersResponse>();
  const data = response.data;

  if (
    !response.success ||
    !data ||
    !Array.isArray(data.places) ||
    !data.places.every(isBookmarkedPlace) ||
    typeof data.truncated !== 'boolean'
  ) {
    throw new Error(
      response.message || '저장한 장소 마커를 불러오지 못했습니다.',
    );
  }

  return data;
};

export const AIRLINE_QUERY_OPTIONS = {
  SEARCH: (params: SearchAirlinesParams) =>
    infiniteQueryOptions({
      queryKey: AIRLINE_QUERY_KEY.SEARCH(params),
      queryFn: ({ pageParam, signal }) =>
        searchAirlines({ ...params, page: pageParam }, signal),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    }),
};

export const PLACE_QUERY_OPTIONS = {
  NEARBY: (params: GetNearbyPlacesParams | null) =>
    queryOptions({
      queryKey: PLACE_QUERY_KEY.NEARBY(params),
      queryFn: () => {
        if (!params) {
          throw new Error('근처 장소 조회 좌표가 필요합니다.');
        }

        return getNearbyPlaces(params);
      },
      enabled: params !== null,
    }),
  SEARCH: (params: SearchPlacesParams) =>
    infiniteQueryOptions({
      queryKey: PLACE_QUERY_KEY.SEARCH(params),
      queryFn: ({ pageParam, signal }) =>
        searchPlaces(
          {
            ...params,
            pageToken: pageParam ?? undefined,
          },
          signal,
        ),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    }),
  BOOKMARKS: (params: GetBookmarkedPlacesParams) =>
    infiniteQueryOptions({
      queryKey: PLACE_QUERY_KEY.BOOKMARKS(params),
      queryFn: ({ pageParam, signal }) =>
        getBookmarkedPlaces({ ...params, page: pageParam }, signal),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    }),
  BOOKMARK_MARKERS: (params: GetBookmarkedPlaceMarkersParams | null) =>
    queryOptions({
      queryKey: PLACE_QUERY_KEY.BOOKMARK_MARKERS(params),
      queryFn: ({ signal }) => {
        if (!params) {
          throw new Error('저장 장소 마커 조회 영역이 필요합니다.');
        }

        return getBookmarkedPlaceMarkers(params, signal);
      },
      enabled: params !== null,
    }),
};

export const PLACE_MUTATION_OPTIONS = {
  UPDATE_BOOKMARK: () =>
    mutationOptions({
      mutationFn: (variables: UpdatePlaceBookmarkVariables) =>
        updatePlaceBookmark(variables),
    }),
};

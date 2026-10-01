import { infiniteQueryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  PLACE_QUERY_KEY,
} from '@/shared/api';

import type {
  BookmarkedPlace,
  GetBookmarkedPlacesPageParams,
  GetBookmarkedPlacesParams,
  GetBookmarkedPlacesResponse,
  Place,
  SearchPlacesPageParams,
  SearchPlacesParams,
  SearchPlacesResponse,
} from './type';

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

export const PLACE_QUERY_OPTIONS = {
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
};

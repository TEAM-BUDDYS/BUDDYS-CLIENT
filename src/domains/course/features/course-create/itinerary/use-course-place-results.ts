'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { PLACE_QUERY_OPTIONS } from '@/domains/course/api/query';
import type { Place } from '@/domains/course/api/type';
import { useCurrentLocation } from '@/domains/course/hook/use-current-location';
import type { CourseMapCenter } from '@/domains/course/model/course-map';
import {
  convertBookmarkedPlaceToPlace,
  type CourseMapCategory,
  getApiPlaceCategory,
  getNearbyPlaceParams,
  mergeCoursePlaces,
} from '@/domains/course/model/course-place';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { COURSE_CREATE_SEARCH_DEBOUNCE_MS } from '../constants';
import type {
  CourseCreateCityOption,
  CourseCreateDayFormState,
} from '../model';

type PlaceResultMode = 'nearby' | 'search' | 'bookmark';

const BOOKMARK_PAGE_SIZE = 20;

const getSearchCenter = (
  cities: CourseCreateCityOption[],
  fallbackPlaces: CourseCreateDayFormState['places'],
): CourseMapCenter | null => {
  const selectedCity = cities.reduce<CourseCreateCityOption | null>(
    (currentCity, city) => {
      if (city.latitude == null || city.longitude == null) {
        return currentCity;
      }

      if (!currentCity) {
        return city;
      }

      const currentRadius =
        currentCity.recommendedRadius ?? Number.NEGATIVE_INFINITY;
      const nextRadius = city.recommendedRadius ?? Number.NEGATIVE_INFINITY;

      return nextRadius > currentRadius ? city : currentCity;
    },
    null,
  );

  if (selectedCity?.latitude != null && selectedCity.longitude != null) {
    return { lat: selectedCity.latitude, lng: selectedCity.longitude };
  }

  const fallbackPlace = fallbackPlaces.find(
    ({ latitude, longitude }) => latitude != null && longitude != null,
  );

  if (fallbackPlace?.latitude == null || fallbackPlace.longitude == null) {
    return null;
  }

  return { lat: fallbackPlace.latitude, lng: fallbackPlace.longitude };
};

interface UseCoursePlaceResultsParams {
  cities: CourseCreateCityOption[];
  fallbackPlaces: CourseCreateDayFormState['places'];
  keyword: string;
  category?: CourseMapCategory;
  nearbyCenter: CourseMapCenter | null;
  isBookmarkMode: boolean;
  isSheetOpen: boolean;
}

export const useCoursePlaceResults = ({
  cities,
  fallbackPlaces,
  keyword,
  category,
  nearbyCenter,
  isBookmarkMode,
  isSheetOpen,
}: UseCoursePlaceResultsParams) => {
  const trimmedKeyword = keyword.trim();
  const debouncedKeyword = useDebouncedValue(
    trimmedKeyword,
    COURSE_CREATE_SEARCH_DEBOUNCE_MS,
  );
  const isKeywordSynced = debouncedKeyword === trimmedKeyword;
  const mode: PlaceResultMode = isBookmarkMode
    ? 'bookmark'
    : trimmedKeyword.length > 0
      ? 'search'
      : 'nearby';
  const isSearchMode = mode === 'search';
  const isSearchReady = isSearchMode && isKeywordSynced;
  const courseCenter = useMemo(
    () => getSearchCenter(cities, fallbackPlaces),
    [cities, fallbackPlaces],
  );
  const {
    currentLocation,
    status: currentLocationStatus,
    refetchCurrentLocation,
  } = useCurrentLocation({ requestOnMount: courseCenter === null });
  const searchCenter = courseCenter ?? currentLocation;
  const nearbyParams = useMemo(
    () => getNearbyPlaceParams(nearbyCenter ?? searchCenter, category),
    [category, nearbyCenter, searchCenter],
  );
  const searchParams = useMemo(
    () => ({
      query: debouncedKeyword,
      category: getApiPlaceCategory(category),
      ...(searchCenter ? { lat: searchCenter.lat, lng: searchCenter.lng } : {}),
    }),
    [category, debouncedKeyword, searchCenter],
  );
  const nearbyQuery = useQuery({
    ...PLACE_QUERY_OPTIONS.NEARBY(nearbyParams),
    enabled: isSheetOpen && mode === 'nearby' && nearbyParams !== null,
  });
  const searchQuery = useInfiniteQuery({
    ...PLACE_QUERY_OPTIONS.SEARCH(searchParams),
    enabled: isSheetOpen && isSearchReady,
  });
  const bookmarkQuery = useInfiniteQuery({
    ...PLACE_QUERY_OPTIONS.BOOKMARKS({ size: BOOKMARK_PAGE_SIZE }),
    enabled: isSheetOpen && mode === 'bookmark',
  });
  const { fetchNextPage: fetchNextSearchPage, refetch: refetchSearch } =
    searchQuery;
  const { fetchNextPage: fetchNextBookmarkPage, refetch: refetchBookmarks } =
    bookmarkQuery;
  const places = useMemo<Place[]>(() => {
    if (mode === 'nearby') {
      return mergeCoursePlaces(nearbyQuery.data ?? []);
    }

    if (isSearchMode) {
      if (!isSearchReady) {
        return [];
      }

      return mergeCoursePlaces(
        searchQuery.data?.pages.flatMap((page) => page.places) ?? [],
      );
    }

    return mergeCoursePlaces(
      bookmarkQuery.data?.pages.flatMap((page) =>
        page.places.map(convertBookmarkedPlaceToPlace),
      ) ?? [],
    );
  }, [
    bookmarkQuery.data?.pages,
    isSearchMode,
    isSearchReady,
    mode,
    nearbyQuery.data,
    searchQuery.data?.pages,
  ]);
  const paginatedQuery =
    mode === 'bookmark' ? bookmarkQuery : isSearchReady ? searchQuery : null;
  const hasNextPage = Boolean(paginatedQuery?.hasNextPage);
  const isFetchingNextPage = Boolean(paginatedQuery?.isFetchingNextPage);
  const isFetchNextPageError = Boolean(paginatedQuery?.isFetchNextPageError);
  const activeQuery = {
    nearby: nearbyQuery,
    search: searchQuery,
    bookmark: bookmarkQuery,
  }[mode];
  const isWaitingForKeyword = isSearchMode && !isKeywordSynced;
  const isNearbyCenterMissing = mode === 'nearby' && nearbyParams === null;
  const isLoading = isNearbyCenterMissing
    ? currentLocationStatus === 'loading'
    : isWaitingForKeyword || activeQuery.isPending;
  const isError = isNearbyCenterMissing
    ? currentLocationStatus === 'error'
    : !isWaitingForKeyword && activeQuery.isLoadingError;
  const { refetch: refetchNearby } = nearbyQuery;
  const retry = useCallback(() => {
    if (mode === 'nearby') {
      if (nearbyParams === null) {
        void refetchCurrentLocation();
      } else {
        void refetchNearby();
      }
      return;
    }

    if (isSearchMode) {
      if (isSearchReady) {
        void refetchSearch();
      }
      return;
    }

    void refetchBookmarks();
  }, [
    isSearchMode,
    isSearchReady,
    mode,
    nearbyParams,
    refetchBookmarks,
    refetchCurrentLocation,
    refetchNearby,
    refetchSearch,
  ]);
  const loadMore = useCallback(() => {
    if (!isSheetOpen || !hasNextPage || isFetchingNextPage) {
      return;
    }

    if (isSearchMode) {
      void fetchNextSearchPage();
      return;
    }

    void fetchNextBookmarkPage();
  }, [
    fetchNextBookmarkPage,
    fetchNextSearchPage,
    hasNextPage,
    isFetchingNextPage,
    isSearchMode,
    isSheetOpen,
  ]);

  return {
    places,
    searchCenter,
    mode,
    isLoading,
    isError,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    retry,
    loadMore,
  };
};

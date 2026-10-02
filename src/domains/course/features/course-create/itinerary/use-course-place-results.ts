'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { PLACE_QUERY_OPTIONS } from '@/domains/course/api/query';
import type { BookmarkedPlace, Place } from '@/domains/course/api/type';
import type { CourseMapCenter } from '@/domains/course/model/course-map';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { COURSE_CREATE_SEARCH_DEBOUNCE_MS } from '../constants';
import type { CourseCreateCityOption } from '../model';

type PlaceCategory = NonNullable<Place['category']>;

const BOOKMARK_PAGE_SIZE = 20;

const getSearchCenter = (
  cities: CourseCreateCityOption[],
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

  if (selectedCity?.latitude == null || selectedCity.longitude == null) {
    return null;
  }

  return { lat: selectedCity.latitude, lng: selectedCity.longitude };
};

const getUniquePlaces = <T extends Place | BookmarkedPlace>(places: T[]) => {
  const seenPlaceIds = new Set<string>();

  return places.filter(({ placeId }) => {
    if (seenPlaceIds.has(placeId)) {
      return false;
    }

    seenPlaceIds.add(placeId);
    return true;
  });
};

interface UseCoursePlaceResultsParams {
  cities: CourseCreateCityOption[];
  keyword: string;
  category?: PlaceCategory;
  isSheetOpen: boolean;
}

export const useCoursePlaceResults = ({
  cities,
  keyword,
  category,
  isSheetOpen,
}: UseCoursePlaceResultsParams) => {
  const trimmedKeyword = keyword.trim();
  const debouncedKeyword = useDebouncedValue(
    trimmedKeyword,
    COURSE_CREATE_SEARCH_DEBOUNCE_MS,
  );
  const isKeywordSynced = debouncedKeyword === trimmedKeyword;
  const isSearchMode = trimmedKeyword.length > 0 || category !== undefined;
  const isSearchReady = trimmedKeyword.length > 0 && isKeywordSynced;
  const searchCenter = useMemo(() => getSearchCenter(cities), [cities]);
  const searchParams = useMemo(
    () => ({
      query: debouncedKeyword,
      ...(category ? { category } : {}),
      ...(searchCenter ? { lat: searchCenter.lat, lng: searchCenter.lng } : {}),
    }),
    [category, debouncedKeyword, searchCenter],
  );
  const searchQuery = useInfiniteQuery({
    ...PLACE_QUERY_OPTIONS.SEARCH(searchParams),
    enabled: isSheetOpen && isSearchMode && isSearchReady,
  });
  const bookmarkQuery = useInfiniteQuery({
    ...PLACE_QUERY_OPTIONS.BOOKMARKS({ size: BOOKMARK_PAGE_SIZE }),
    enabled: isSheetOpen && !isSearchMode,
  });
  const { fetchNextPage: fetchNextSearchPage, refetch: refetchSearch } =
    searchQuery;
  const { fetchNextPage: fetchNextBookmarkPage, refetch: refetchBookmarks } =
    bookmarkQuery;
  const places = useMemo<(Place | BookmarkedPlace)[]>(() => {
    if (isSearchMode) {
      if (!isSearchReady) {
        return [];
      }

      return getUniquePlaces(
        searchQuery.data?.pages.flatMap((page) => page.places) ?? [],
      );
    }

    return getUniquePlaces(
      bookmarkQuery.data?.pages.flatMap((page) => page.places) ?? [],
    );
  }, [
    bookmarkQuery.data?.pages,
    isSearchMode,
    isSearchReady,
    searchQuery.data?.pages,
  ]);
  const hasNextPage = isSearchMode
    ? searchQuery.hasNextPage
    : bookmarkQuery.hasNextPage;
  const isFetchingNextPage = isSearchMode
    ? searchQuery.isFetchingNextPage
    : bookmarkQuery.isFetchingNextPage;
  const isFetchNextPageError = isSearchMode
    ? searchQuery.isFetchNextPageError
    : bookmarkQuery.isFetchNextPageError;
  const isLoading = isSearchMode
    ? trimmedKeyword.length > 0 && (!isKeywordSynced || searchQuery.isPending)
    : bookmarkQuery.isPending;
  const isError = isSearchMode
    ? isSearchReady && searchQuery.isLoadingError
    : bookmarkQuery.isLoadingError;
  const retry = useCallback(() => {
    if (isSearchMode) {
      if (isSearchReady) {
        void refetchSearch();
      }
      return;
    }

    void refetchBookmarks();
  }, [isSearchMode, isSearchReady, refetchBookmarks, refetchSearch]);
  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) {
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
  ]);

  return {
    places,
    searchCenter,
    isSearchMode,
    isAwaitingKeyword: isSearchMode && trimmedKeyword.length === 0,
    isLoading,
    isError,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage: Boolean(hasNextPage),
    retry,
    loadMore,
  };
};

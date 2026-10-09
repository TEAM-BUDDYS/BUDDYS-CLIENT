import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { PLACE_QUERY_OPTIONS } from '@/domains/course/api/query';
import type { Place } from '@/domains/course/api/type';
import type { CourseMapCenter } from '@/domains/course/model/course-map';
import {
  type CourseMapCategory,
  getApiPlaceCategory,
  getNearbyPlaceParams,
} from '@/domains/course/model/course-place';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

const EMPTY_PLACES: Place[] = [];
const SEARCH_DEBOUNCE_MS = 300;

interface UseNearbyPlacesParams {
  currentLocation: CourseMapCenter | null;
  nearbyCenter?: CourseMapCenter | null;
  searchKeyword: string;
  selectedCategory?: CourseMapCategory;
}

export const useNearbyPlaces = ({
  currentLocation,
  nearbyCenter = currentLocation,
  searchKeyword,
  selectedCategory,
}: UseNearbyPlacesParams) => {
  const nearbyParams = useMemo(
    () => getNearbyPlaceParams(nearbyCenter, selectedCategory),
    [nearbyCenter, selectedCategory],
  );
  const trimmedKeyword = searchKeyword.trim();
  const debouncedKeyword = useDebouncedValue(
    trimmedKeyword,
    SEARCH_DEBOUNCE_MS,
  );
  const isSearchMode = trimmedKeyword.length > 0;
  const isSearchReady = isSearchMode && debouncedKeyword === trimmedKeyword;
  const searchParams = useMemo(
    () => ({
      query: debouncedKeyword,
      category: getApiPlaceCategory(selectedCategory),
      ...(currentLocation
        ? { lat: currentLocation.lat, lng: currentLocation.lng }
        : {}),
    }),
    [currentLocation, debouncedKeyword, selectedCategory],
  );
  const nearbyQuery = useQuery({
    ...PLACE_QUERY_OPTIONS.NEARBY(nearbyParams),
    enabled: !isSearchMode && nearbyParams !== null,
  });
  const searchQuery = useInfiniteQuery({
    ...PLACE_QUERY_OPTIONS.SEARCH(searchParams),
    enabled: isSearchReady,
  });
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = searchQuery;
  const places = useMemo(() => {
    if (!isSearchMode) return nearbyQuery.data ?? EMPTY_PLACES;
    if (!isSearchReady) return EMPTY_PLACES;

    return Array.from(
      new Map(
        (searchQuery.data?.pages.flatMap((page) => page.places) ?? []).map(
          (place) => [place.placeId, place] as const,
        ),
      ).values(),
    );
  }, [isSearchMode, isSearchReady, nearbyQuery.data, searchQuery.data?.pages]);
  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    places,
    hasError: isSearchMode
      ? isSearchReady && searchQuery.isLoadingError
      : nearbyQuery.isError,
    hasNextPage: isSearchMode && Boolean(searchQuery.hasNextPage),
    isFetchNextPageError: isSearchMode && searchQuery.isFetchNextPageError,
    isFetchingNextPage: isSearchMode && searchQuery.isFetchingNextPage,
    isLoading: isSearchMode
      ? !isSearchReady || searchQuery.isPending
      : nearbyQuery.isLoading,
    isSearchMode,
    loadMore,
    refetch: isSearchMode ? searchQuery.refetch : nearbyQuery.refetch,
  };
};

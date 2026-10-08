import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { PLACE_QUERY_OPTIONS } from '@/domains/course/api/query';
import type { BookmarkedPlace } from '@/domains/course/api/type';
import { getBookmarkedCourseItems } from '@/domains/course/model/course-place';

const BOOKMARK_PAGE_SIZE = 20;

const getUniquePlaces = (places: BookmarkedPlace[]) =>
  Array.from(new Map(places.map((place) => [place.placeId, place])).values());

interface UseBookmarkedPlacesParams {
  enabled: boolean;
}

export const useBookmarkedPlaces = ({ enabled }: UseBookmarkedPlacesParams) => {
  const query = useInfiniteQuery({
    ...PLACE_QUERY_OPTIONS.BOOKMARKS({ size: BOOKMARK_PAGE_SIZE }),
    enabled,
  });
  const places = useMemo(
    () =>
      getUniquePlaces(query.data?.pages.flatMap((page) => page.places) ?? []),
    [query.data?.pages],
  );
  const items = useMemo(() => getBookmarkedCourseItems(places), [places]);
  const loadMore = useCallback(() => {
    if (!query.hasNextPage || query.isFetchingNextPage) return;

    void query.fetchNextPage();
  }, [query]);

  return {
    hasError: query.isLoadingError,
    hasNextPage: Boolean(query.hasNextPage),
    isFetchNextPageError: query.isFetchNextPageError,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isPending,
    items,
    loadMore,
    refetch: query.refetch,
  };
};

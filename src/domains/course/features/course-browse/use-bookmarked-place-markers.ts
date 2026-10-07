import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { PLACE_QUERY_OPTIONS } from '@/domains/course/api/query';
import type { CourseMapBounds } from '@/domains/course/model/course-map';
import { convertBookmarkedPlaceToPlace } from '@/domains/course/model/course-place';

interface UseBookmarkedPlaceMarkersParams {
  bounds: CourseMapBounds | null;
}

export const useBookmarkedPlaceMarkers = ({
  bounds,
}: UseBookmarkedPlaceMarkersParams) => {
  const query = useQuery({
    ...PLACE_QUERY_OPTIONS.BOOKMARK_MARKERS(bounds),
    placeholderData: keepPreviousData,
  });
  const places = useMemo(
    () => query.data?.places.map(convertBookmarkedPlaceToPlace) ?? [],
    [query.data?.places],
  );

  return {
    dataUpdatedAt: query.dataUpdatedAt,
    isLoading: bounds === null || query.isFetching || query.isPlaceholderData,
    places,
    truncated: query.data?.truncated ?? false,
  };
};

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { PLACE_QUERY_OPTIONS } from '@/domains/course/api/query';
import type { Place } from '@/domains/course/api/type';
import type { CourseMapCenter } from '@/domains/course/model/course-map';
import {
  type CourseMapCategory,
  getNearbyPlaceParams,
} from '@/domains/course/model/course-place';

const EMPTY_PLACES: Place[] = [];

interface UseNearbyPlacesParams {
  currentLocation: CourseMapCenter | null;
  selectedCategory?: CourseMapCategory;
}

export const useNearbyPlaces = ({
  currentLocation,
  selectedCategory,
}: UseNearbyPlacesParams) => {
  const params = useMemo(
    () => getNearbyPlaceParams(currentLocation, selectedCategory),
    [currentLocation, selectedCategory],
  );
  const query = useQuery(PLACE_QUERY_OPTIONS.NEARBY(params));

  return {
    places: query.data ?? EMPTY_PLACES,
    hasError: query.isError,
    isLoading: query.isPending,
    refetch: query.refetch,
  };
};

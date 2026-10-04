import { useCallback, useMemo, useRef, useState } from 'react';

import { getGooglePlaceDetails } from '@/domains/course/api/google-place';
import type { Place } from '@/domains/course/api/type';
import {
  getNearbyCourseItems,
  type NearbyCourseItem,
} from '@/domains/course/model/course-place';
import {
  convertGooglePlaceToPlace,
  type GoogleMapPoi,
} from '@/domains/course/model/google-place';

interface UseCoursePlaceSelectionParams {
  nearbyPlaces: readonly Place[];
}

export const useCoursePlaceSelection = ({
  nearbyPlaces,
}: UseCoursePlaceSelectionParams) => {
  const [selectedPlace, setSelectedPlace] = useState<Place>();
  const selectionRequestIdRef = useRef(0);

  const clearSelectedPlace = useCallback(() => {
    selectionRequestIdRef.current += 1;
    setSelectedPlace(undefined);
  }, []);

  const selectNearbyPlace = useCallback(
    (placeId: string) => {
      selectionRequestIdRef.current += 1;
      const place = nearbyPlaces.find((item) => item.placeId === placeId);

      setSelectedPlace(place);
      return place;
    },
    [nearbyPlaces],
  );

  const selectGooglePlace = useCallback(async (poi: GoogleMapPoi) => {
    const requestId = selectionRequestIdRef.current + 1;
    selectionRequestIdRef.current = requestId;
    const googlePlace = await getGooglePlaceDetails(poi.placeId);
    const place = convertGooglePlaceToPlace(googlePlace, poi);

    if (selectionRequestIdRef.current !== requestId) return undefined;

    setSelectedPlace(place);
    return place;
  }, []);

  const updateSelectedPlaceBookmark = useCallback(
    (placeId: string, bookmarked: boolean) => {
      setSelectedPlace((currentPlace) =>
        currentPlace?.placeId === placeId
          ? { ...currentPlace, bookmarked }
          : currentPlace,
      );
    },
    [],
  );

  const nearbyItems = useMemo<NearbyCourseItem[]>(
    () => getNearbyCourseItems(nearbyPlaces, selectedPlace),
    [nearbyPlaces, selectedPlace],
  );

  return {
    clearSelectedPlace,
    nearbyItems,
    selectedPlaceId: selectedPlace?.placeId,
    selectGooglePlace,
    selectNearbyPlace,
    updateSelectedPlaceBookmark,
  };
};

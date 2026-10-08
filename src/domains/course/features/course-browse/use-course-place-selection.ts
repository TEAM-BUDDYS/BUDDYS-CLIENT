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
  bookmarkedPlaces?: readonly Place[];
}

export const useCoursePlaceSelection = ({
  nearbyPlaces,
  bookmarkedPlaces = [],
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
      const nearbyPlace = nearbyPlaces.find((item) => item.placeId === placeId);
      const bookmarkedPlace = bookmarkedPlaces.find(
        (item) => item.placeId === placeId,
      );
      const place = nearbyPlace
        ? {
            ...nearbyPlace,
            bookmarked: nearbyPlace.bookmarked || Boolean(bookmarkedPlace),
          }
        : bookmarkedPlace;

      setSelectedPlace(place);
      return place;
    },
    [bookmarkedPlaces, nearbyPlaces],
  );

  const selectGooglePlace = useCallback(
    async (poi: GoogleMapPoi) => {
      const requestId = selectionRequestIdRef.current + 1;
      selectionRequestIdRef.current = requestId;
      const googlePlace = await getGooglePlaceDetails(poi.placeId);
      const knownBookmarkedPlace = bookmarkedPlaces.find(
        (place) => place.placeId === poi.placeId,
      );
      const place = {
        ...convertGooglePlaceToPlace(googlePlace, poi),
        bookmarked: Boolean(knownBookmarkedPlace),
      };

      if (selectionRequestIdRef.current !== requestId) return undefined;

      setSelectedPlace(place);
      return place;
    },
    [bookmarkedPlaces],
  );

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

  const resolvedSelectedPlace = useMemo(() => {
    if (
      !selectedPlace ||
      selectedPlace.bookmarked ||
      !bookmarkedPlaces.some((place) => place.placeId === selectedPlace.placeId)
    ) {
      return selectedPlace;
    }

    return { ...selectedPlace, bookmarked: true };
  }, [bookmarkedPlaces, selectedPlace]);

  const nearbyItems = useMemo<NearbyCourseItem[]>(
    () => getNearbyCourseItems(nearbyPlaces, resolvedSelectedPlace),
    [nearbyPlaces, resolvedSelectedPlace],
  );

  return {
    clearSelectedPlace,
    nearbyItems,
    selectedPlace: resolvedSelectedPlace,
    selectedPlaceId: resolvedSelectedPlace?.placeId,
    selectGooglePlace,
    selectNearbyPlace,
    updateSelectedPlaceBookmark,
  };
};

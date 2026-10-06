import type { GetNearbyPlacesParams, Place } from '@/domains/course/api/type';
import type { CourseMapCenter } from '@/domains/course/model/course-map';

export interface NearbyCourseItem {
  place: Place;
  description: string;
}

const NEARBY_PLACE_RADIUS_METERS = 1500;
const API_CATEGORY_BY_MAP_CATEGORY = {
  sightseeing: 'TOURISM',
  food: 'RESTAURANT',
  cafe: 'CAFE',
  accommodation: 'ACCOMMODATION',
} as const;

export type CourseMapCategory = keyof typeof API_CATEGORY_BY_MAP_CATEGORY;

export const getNearbyPlaceParams = (
  currentLocation: CourseMapCenter | null,
  selectedCategory?: CourseMapCategory,
): GetNearbyPlacesParams | null => {
  if (!currentLocation) return null;

  return {
    lat: currentLocation.lat,
    lng: currentLocation.lng,
    radius: NEARBY_PLACE_RADIUS_METERS,
    category: selectedCategory
      ? API_CATEGORY_BY_MAP_CATEGORY[selectedCategory]
      : undefined,
  };
};

const getPlaceDescription = (place: Place) =>
  [place.country, place.city].filter(Boolean).join(' · ') || '위치 정보 없음';

export const getNearbyCourseItems = (
  places: readonly Place[],
  selectedPlace?: Place,
): NearbyCourseItem[] => {
  const orderedPlaces = selectedPlace
    ? [
        selectedPlace,
        ...places.filter(({ placeId }) => placeId !== selectedPlace.placeId),
      ]
    : places;

  return orderedPlaces.map((place) => ({
    place,
    description: getPlaceDescription(place),
  }));
};

import type { Place } from '@/domains/course/api/type';
import type { CourseMapCenter } from '@/domains/course/model/course-map';
import { END_POINT } from '@/shared/api';

export interface GoogleMapPoi {
  placeId: string;
  position: CourseMapCenter | null;
}

export interface GoogleAddressComponent {
  longText: string;
  types: string[];
}

export interface GooglePlaceData {
  addressComponents?: GoogleAddressComponent[];
  displayName: string;
  formattedAddress?: string;
  googleMapsUrl?: string;
  position?: CourseMapCenter;
}

const getAddressComponent = (
  addressComponents: GoogleAddressComponent[] | undefined,
  type: string,
) =>
  addressComponents?.find((component) => component.types.includes(type))
    ?.longText ?? null;

export const createPlacePhotoUrl = (placeId: string) =>
  `/${END_POINT.PLACE.PHOTO(placeId, 400)}`;

export const createGoogleMapsPlaceUrl = (placeId: string) =>
  `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`;

export const convertGooglePlaceToPlace = (
  googlePlace: GooglePlaceData,
  poi: GoogleMapPoi,
): Place => {
  const position = googlePlace.position ?? poi.position;

  return {
    placeId: poi.placeId,
    name: googlePlace.displayName,
    address: googlePlace.formattedAddress ?? null,
    latitude: position?.lat ?? null,
    longitude: position?.lng ?? null,
    bookmarked: false,
    photoUrl: createPlacePhotoUrl(poi.placeId),
    googleMapsUrl:
      googlePlace.googleMapsUrl ?? createGoogleMapsPlaceUrl(poi.placeId),
    country: getAddressComponent(googlePlace.addressComponents, 'country'),
    city:
      getAddressComponent(googlePlace.addressComponents, 'locality') ??
      getAddressComponent(
        googlePlace.addressComponents,
        'administrative_area_level_1',
      ),
  };
};

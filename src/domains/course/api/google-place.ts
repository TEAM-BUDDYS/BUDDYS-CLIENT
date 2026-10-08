import type {
  GoogleAddressComponent,
  GooglePlaceData,
} from '@/domains/course/model/google-place';

interface GooglePlaceDetails {
  addressComponents?: GoogleAddressComponent[];
  displayName?: string;
  formattedAddress?: string;
  googleMapsURI?: string;
  location?: { toJSON: () => { lat: number; lng: number } };
  fetchFields: (options: { fields: string[] }) => Promise<unknown>;
}

interface GooglePlaceConstructor {
  new (options: { id: string }): GooglePlaceDetails;
}

interface GoogleMapsApi {
  importLibrary: (
    libraryName: 'places',
  ) => Promise<{ Place: GooglePlaceConstructor }>;
}

const GOOGLE_PLACE_FIELDS = [
  'addressComponents',
  'displayName',
  'formattedAddress',
  'googleMapsURI',
  'location',
];

const getGoogleMapsApi = () =>
  (
    window as typeof window & {
      google?: { maps?: GoogleMapsApi };
    }
  ).google?.maps;

export const getGooglePlaceDetails = async (
  placeId: string,
): Promise<GooglePlaceData> => {
  const googleMapsApi = getGoogleMapsApi();

  if (!googleMapsApi) {
    throw new Error('Google Maps API is not ready.');
  }

  const { Place: GooglePlace } = await googleMapsApi.importLibrary('places');
  const googlePlace = new GooglePlace({ id: placeId });
  await googlePlace.fetchFields({ fields: GOOGLE_PLACE_FIELDS });

  if (!googlePlace.displayName) {
    throw new Error('Google Place name is missing.');
  }

  return {
    addressComponents: googlePlace.addressComponents,
    displayName: googlePlace.displayName,
    formattedAddress: googlePlace.formattedAddress,
    googleMapsUrl: googlePlace.googleMapsURI,
    position: googlePlace.location?.toJSON(),
  };
};

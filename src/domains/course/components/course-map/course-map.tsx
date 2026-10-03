'use client';

import {
  APIProvider,
  Map,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';

import type { Place } from '@/domains/course/api/type';
import { CourseCurrentLocationMarker } from '@/domains/course/components/course-map/course-current-location-marker';
import { CourseMapCamera } from '@/domains/course/components/course-map/course-map-camera';
import { CourseMapMarker } from '@/domains/course/components/course-map/course-map-marker';
import type {
  CourseMapCameraState,
  CourseMapCenter,
} from '@/domains/course/model/course-map';
import { AsyncErrorState } from '@/shared/components/ui';

const FALLBACK_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

interface GoogleAddressComponent {
  longText: string;
  types: string[];
}

interface GooglePlaceDetails {
  addressComponents?: GoogleAddressComponent[];
  displayName?: string;
  formattedAddress?: string;
  googleMapsURI?: string;
  location?: { toJSON: () => CourseMapCenter };
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

const getAddressComponent = (
  addressComponents: GoogleAddressComponent[] | undefined,
  type: string,
) =>
  addressComponents?.find((component) => component.types.includes(type))
    ?.longText ?? null;

const getGoogleMapsApi = () =>
  (
    window as typeof window & {
      google?: {
        maps?: GoogleMapsApi;
      };
    }
  ).google?.maps;

interface CourseMapProps {
  places: Place[];
  bottomOverlayRatio?: number;
  currentLocation?: CourseMapCenter | null;
  preserveCamera?: boolean;
  showCurrentLocation?: boolean;
  selectedPlaceId?: string;
  cameraTarget?: CourseMapCenter | null;
  initialCamera?: CourseMapCameraState | null;
  onCameraChange?: (camera: CourseMapCameraState) => void;
  onMapPlaceSelect?: (place: Place) => void;
  onPlaceSelect?: (placeId: string) => void;
}

export const CourseMap = ({
  places,
  bottomOverlayRatio = 0,
  currentLocation = null,
  preserveCamera = false,
  showCurrentLocation = false,
  selectedPlaceId,
  cameraTarget = null,
  initialCamera = null,
  onCameraChange,
  onMapPlaceSelect,
  onPlaceSelect,
}: CourseMapProps) => {
  const [hasMapLoadError, setHasMapLoadError] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  const selectedPlace = places.find(
    (place) => place.placeId === selectedPlaceId,
  );

  const selectedPlaceCenter =
    selectedPlace?.latitude != null && selectedPlace.longitude != null
      ? {
          lat: selectedPlace.latitude,
          lng: selectedPlace.longitude,
        }
      : null;

  const center = selectedPlaceCenter ?? currentLocation ?? FALLBACK_CENTER;
  const resolvedCameraTarget = cameraTarget ?? selectedPlaceCenter;

  const handleMapClick = async (event: MapMouseEvent) => {
    const { latLng, placeId } = event.detail;

    if (!placeId || !onMapPlaceSelect) return;

    event.stop();

    try {
      const googleMapsApi = getGoogleMapsApi();

      if (!googleMapsApi) throw new Error('Google Maps API is not ready.');

      const { Place: GooglePlace } =
        await googleMapsApi.importLibrary('places');
      const googlePlace = new GooglePlace({ id: placeId });
      await googlePlace.fetchFields({
        fields: [
          'addressComponents',
          'displayName',
          'formattedAddress',
          'googleMapsURI',
          'location',
        ],
      });

      const position = googlePlace.location?.toJSON() ?? latLng;

      onMapPlaceSelect({
        placeId,
        name: googlePlace.displayName ?? null,
        address: googlePlace.formattedAddress ?? null,
        latitude: position?.lat ?? null,
        longitude: position?.lng ?? null,
        bookmarked: false,
        photoUrl: `/api/v1/places/${encodeURIComponent(placeId)}/photo?maxWidth=400`,
        googleMapsUrl:
          googlePlace.googleMapsURI ??
          `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`,
        country: getAddressComponent(googlePlace.addressComponents, 'country'),
        city:
          getAddressComponent(googlePlace.addressComponents, 'locality') ??
          getAddressComponent(
            googlePlace.addressComponents,
            'administrative_area_level_1',
          ),
      });
    } catch {
      onMapPlaceSelect({
        placeId,
        name: null,
        address: null,
        latitude: latLng?.lat ?? null,
        longitude: latLng?.lng ?? null,
        bookmarked: false,
        photoUrl: `/api/v1/places/${encodeURIComponent(placeId)}/photo?maxWidth=400`,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`,
        country: null,
        city: null,
      });
    }
  };

  if (hasMapLoadError) {
    return (
      <section className="relative h-80 w-full overflow-hidden rounded-2xl bg-gray-50">
        <AsyncErrorState
          className="min-h-full py-4"
          title="지도를 불러오지 못했어요"
          onRetry={() => setHasMapLoadError(false)}
        />
      </section>
    );
  }

  if (!apiKey || !mapId) {
    return (
      <section className="relative h-80 w-full overflow-hidden rounded-2xl bg-gray-50">
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          {selectedPlace?.name ?? '지도가 표시될 영역입니다'}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-full w-full overflow-hidden rounded-2xl">
      <APIProvider apiKey={apiKey} onError={() => setHasMapLoadError(true)}>
        <Map
          mapId={mapId}
          defaultCenter={initialCamera?.center ?? center}
          defaultZoom={initialCamera?.zoom ?? 15}
          gestureHandling="greedy"
          clickableIcons
          disableDefaultUI
          keyboardShortcuts={false}
          onClick={handleMapClick}
          onCameraChanged={({ detail }) =>
            onCameraChange?.({ center: detail.center, zoom: detail.zoom })
          }
        >
          <CourseMapCamera
            bottomOverlayRatio={bottomOverlayRatio}
            center={resolvedCameraTarget}
            preserveCamera={preserveCamera}
          />

          {showCurrentLocation && currentLocation && (
            <CourseCurrentLocationMarker position={currentLocation} />
          )}

          {places.map((place) => {
            if (place.latitude == null || place.longitude == null) return null;

            return (
              <CourseMapMarker
                key={place.placeId}
                placeId={place.placeId}
                position={{
                  lat: place.latitude,
                  lng: place.longitude,
                }}
                title={place.name ?? '이름 없는 장소'}
                onSelect={onPlaceSelect}
              />
            );
          })}
        </Map>
      </APIProvider>
    </section>
  );
};

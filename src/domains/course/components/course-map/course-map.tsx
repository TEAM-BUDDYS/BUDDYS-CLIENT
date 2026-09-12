'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';

import type { Place } from '@/domains/course/api/type';
import { CourseMapCamera } from '@/domains/course/components/course-map/course-map-camera';
import { CourseMapMarker } from '@/domains/course/components/course-map/course-map-marker';
import { useCurrentLocation } from '@/domains/course/hook/use-current-location';
import type { CourseMapCenter } from '@/domains/course/model/course-map';

const FALLBACK_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

interface CourseMapProps {
  places: Place[];
  selectedPlaceId?: string;
  cameraTarget?: CourseMapCenter | null;
  onPlaceSelect?: (placeId: string) => void;
}

export const CourseMap = ({
  places,
  selectedPlaceId,
  cameraTarget = null,
  onPlaceSelect,
}: CourseMapProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const currentLocation = useCurrentLocation();

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
  const resolvedCameraTarget = cameraTarget ?? currentLocation;

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
    <section className="relative h-80 w-full overflow-hidden rounded-2xl">
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={mapId}
          defaultCenter={center}
          defaultZoom={15}
          gestureHandling="greedy"
          disableDefaultUI
        >
          <CourseMapCamera center={resolvedCameraTarget} />

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
                onSelect={onPlaceSelect}
              />
            );
          })}
        </Map>
      </APIProvider>
    </section>
  );
};

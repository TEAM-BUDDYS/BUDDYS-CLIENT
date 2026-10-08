'use client';

import {
  APIProvider,
  Map,
  type MapEvent,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';

import type { Place } from '@/domains/course/api/type';
import { CourseCurrentLocationMarker } from '@/domains/course/components/course-map/course-current-location-marker';
import { CourseMapCamera } from '@/domains/course/components/course-map/course-map-camera';
import { CourseMapMarker } from '@/domains/course/components/course-map/course-map-marker';
import type {
  CourseMapBounds,
  CourseMapCenter,
} from '@/domains/course/model/course-map';
import type { GoogleMapPoi } from '@/domains/course/model/google-place';
import { AsyncErrorState } from '@/shared/components/ui';

const FALLBACK_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

interface CourseMapProps {
  places: Place[];
  bottomOverlayRatio?: number;
  currentLocation?: CourseMapCenter | null;
  preserveCamera?: boolean;
  showCurrentLocation?: boolean;
  selectedPlace?: Place;
  selectedPlaceId?: string;
  cameraTarget?: CourseMapCenter | null;
  onBoundsChange?: (bounds: CourseMapBounds) => void;
  onPoiSelect?: (poi: GoogleMapPoi) => void;
  onPlaceSelect?: (placeId: string) => void;
}

export const CourseMap = ({
  places,
  bottomOverlayRatio = 0,
  currentLocation = null,
  preserveCamera = false,
  showCurrentLocation = false,
  selectedPlace,
  selectedPlaceId,
  cameraTarget = null,
  onBoundsChange,
  onPoiSelect,
  onPlaceSelect,
}: CourseMapProps) => {
  const [hasMapLoadError, setHasMapLoadError] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  const resolvedSelectedPlace =
    selectedPlace ?? places.find((place) => place.placeId === selectedPlaceId);

  const selectedPlaceCenter =
    resolvedSelectedPlace?.latitude != null &&
    resolvedSelectedPlace.longitude != null
      ? {
          lat: resolvedSelectedPlace.latitude,
          lng: resolvedSelectedPlace.longitude,
        }
      : null;

  const center = selectedPlaceCenter ?? currentLocation ?? FALLBACK_CENTER;
  const resolvedCameraTarget =
    cameraTarget ?? selectedPlaceCenter ?? currentLocation;

  const handleMapClick = (event: MapMouseEvent) => {
    const { latLng, placeId } = event.detail;

    if (!placeId || !onPoiSelect) return;

    event.stop();
    onPoiSelect({ placeId, position: latLng });
  };

  const handleMapIdle = (event: MapEvent) => {
    const bounds = event.map.getBounds()?.toJSON();

    if (!bounds || !onBoundsChange) return;

    onBoundsChange({
      swLat: bounds.south,
      swLng: bounds.west,
      neLat: bounds.north,
      neLng: bounds.east,
    });
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
          {resolvedSelectedPlace?.name ?? '지도가 표시될 영역입니다'}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-full w-full overflow-hidden rounded-2xl">
      <APIProvider apiKey={apiKey} onError={() => setHasMapLoadError(true)}>
        <Map
          mapId={mapId}
          defaultCenter={center}
          defaultZoom={15}
          gestureHandling="greedy"
          clickableIcons
          disableDefaultUI
          keyboardShortcuts={false}
          onClick={handleMapClick}
          onIdle={handleMapIdle}
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

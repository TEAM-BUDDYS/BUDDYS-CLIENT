'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useState } from 'react';

import { CourseMapCamera } from '@/domains/course/components/course-map/course-map-camera';
import { CourseMapMarker } from '@/domains/course/components/course-map/course-map-marker';
import { useCurrentLocation } from '@/domains/course/hook/use-current-location';
import type { CourseMapCenter } from '@/domains/course/model/course-map';
import { AsyncErrorState } from '@/shared/components/ui';

import type { CourseCreateDayFormState } from '../model';

const FALLBACK_CENTER: CourseMapCenter = {
  lat: 37.5665,
  lng: 126.978,
};

interface CourseCreatePlaceMapProps {
  bottomOverlayRatio?: number;
  center?: CourseMapCenter | null;
  focusRequestKey?: number;
  focusedPlaceId?: string;
  places: CourseCreateDayFormState['places'];
  onPlaceSelect: (placeId: string) => void;
}

const getPlaceCenter = (
  place: CourseCreateDayFormState['places'][number] | undefined,
): CourseMapCenter | null => {
  if (place?.latitude == null || place.longitude == null) {
    return null;
  }

  return {
    lat: place.latitude,
    lng: place.longitude,
  };
};

export const CourseCreatePlaceMap = ({
  bottomOverlayRatio = 0,
  center = null,
  focusRequestKey,
  focusedPlaceId,
  places,
  onPlaceSelect,
}: CourseCreatePlaceMapProps) => {
  const [hasMapLoadError, setHasMapLoadError] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const { currentLocation } = useCurrentLocation({
    requestOnMount: center === null,
  });
  const focusedPlace = places.find(({ placeId }) => placeId === focusedPlaceId);
  const focusedPlaceCenter = getPlaceCenter(focusedPlace);
  const firstPlaceCenter = getPlaceCenter(
    places.find(
      ({ latitude, longitude }) => latitude != null && longitude != null,
    ),
  );
  const initialCenter =
    center ?? currentLocation ?? firstPlaceCenter ?? FALLBACK_CENTER;
  const cameraTarget =
    focusedPlaceCenter ?? center ?? currentLocation ?? firstPlaceCenter;
  const sectionClassName = 'relative h-full w-full overflow-hidden bg-gray-50';

  if (hasMapLoadError) {
    return (
      <section className={sectionClassName}>
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
      <section className={sectionClassName}>
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          {focusedPlace?.name ?? '지도가 표시될 영역입니다'}
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClassName}>
      <APIProvider apiKey={apiKey} onError={() => setHasMapLoadError(true)}>
        <Map
          mapId={mapId}
          defaultCenter={initialCenter}
          defaultZoom={12}
          gestureHandling="greedy"
          disableDefaultUI
        >
          <CourseMapCamera
            bottomOverlayRatio={bottomOverlayRatio}
            center={cameraTarget}
            requestId={focusRequestKey}
          />

          {places.map((place) => {
            const placeCenter = getPlaceCenter(place);

            if (!placeCenter) {
              return null;
            }

            return (
              <CourseMapMarker
                key={place.placeId}
                placeId={place.placeId}
                position={placeCenter}
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

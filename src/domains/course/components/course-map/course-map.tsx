'use client';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

import type { Place } from '@/domains/course/api/type';
import { useCurrentLocation } from '@/domains/course/hook/use-current-location';

const FALLBACK_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

interface CourseMapProps {
  places: Place[];
  selectedPlaceId?: string;
  onPlaceSelect?: (placeId: string) => void;
}

export const CourseMap = ({
  places,
  selectedPlaceId,
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
          center={center}
          defaultZoom={15}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {places.map((place) => {
            if (place.latitude == null || place.longitude == null) return null;

            const isSelected = place.placeId === selectedPlaceId;

            return (
              <AdvancedMarker
                key={place.placeId}
                position={{
                  lat: place.latitude,
                  lng: place.longitude,
                }}
                onClick={() => onPlaceSelect?.(place.placeId)}
              >
                <div className="relative h-10 w-8">
                  <div
                    className={
                      isSelected
                        ? 'absolute top-0 left-0 h-8 w-8 rotate-45 rounded-[50%_50%_0_50%] bg-[#ff5a5f] shadow-md'
                        : 'absolute top-0 left-0 h-8 w-8 rotate-45 rounded-[50%_50%_0_50%] bg-gray-400 shadow-md'
                    }
                  />
                  <div className="absolute top-2.5 left-2.5 h-3 w-3 rounded-full bg-white" />
                </div>
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>
    </section>
  );
};

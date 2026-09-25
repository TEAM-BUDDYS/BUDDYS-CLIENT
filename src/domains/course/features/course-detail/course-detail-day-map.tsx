'use client';

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Polyline,
  useMap,
} from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useState } from 'react';

import type { CourseDetail } from '@/domains/course/api/type';
import type { CourseMapCenter } from '@/domains/course/model/course-map';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CourseMarkerIcon,
} from '@/shared/components/icons';
import { AsyncErrorState } from '@/shared/components/ui';

type CourseDetailDay = CourseDetail['days'][number];

type CourseDetailMapDay = Pick<CourseDetailDay, 'dayNumber' | 'places'>;

interface CourseDetailDayMapProps {
  days: CourseDetailMapDay[];
}

interface CourseDetailMapViewportProps {
  positions: CourseMapCenter[];
}

interface CourseDetailMapMarkerProps {
  order: number;
  position: CourseMapCenter;
  title: string;
}

const SINGLE_PLACE_ZOOM = 15;
const MAP_BOUNDS_PADDING = 48;
const COURSE_LINE_ICONS = [
  {
    icon: {
      path: 'M 0,-1 0,1',
      strokeColor: '#474b54',
      strokeOpacity: 1,
      strokeWeight: 1,
    },
    offset: '0',
    repeat: '4px',
  },
];

const CourseDetailMapViewport = ({
  positions,
}: CourseDetailMapViewportProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || positions.length === 0) return;

    if (positions.length === 1) {
      map.panTo(positions[0]);
      map.setZoom(SINGLE_PLACE_ZOOM);
      return;
    }

    const latitudes = positions.map(({ lat }) => lat);
    const longitudes = positions.map(({ lng }) => lng);

    map.fitBounds(
      {
        east: Math.max(...longitudes),
        north: Math.max(...latitudes),
        south: Math.min(...latitudes),
        west: Math.min(...longitudes),
      },
      MAP_BOUNDS_PADDING,
    );
  }, [map, positions]);

  return null;
};

const CourseDetailMapMarker = ({
  order,
  position,
  title,
}: CourseDetailMapMarkerProps) => {
  return (
    <AdvancedMarker
      position={position}
      title={title}
      anchorLeft="-50%"
      anchorTop={order === 1 ? '-100%' : '-50%'}
      zIndex={2}
    >
      {order === 1 ? (
        <CourseMarkerIcon className="size-6" />
      ) : (
        <span className="text-caption-m-10 bg-error flex size-[17px] items-center justify-center rounded-full text-center text-white drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.42)]">
          {order}
        </span>
      )}
    </AdvancedMarker>
  );
};

export const CourseDetailDayMap = ({ days }: CourseDetailDayMapProps) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [hasMapLoadError, setHasMapLoadError] = useState(false);
  const sortedDays = useMemo(
    () =>
      [...days].sort(
        (firstDay, secondDay) => firstDay.dayNumber - secondDay.dayNumber,
      ),
    [days],
  );
  const activeDayIndex = Math.min(
    selectedDayIndex,
    Math.max(sortedDays.length - 1, 0),
  );
  const activeDay = sortedDays[activeDayIndex];
  const markerPlaces = useMemo(
    () =>
      (activeDay?.places ?? [])
        .flatMap((place, placeIndex) => {
          if (place.latitude == null || place.longitude == null) return [];

          return [
            {
              key: `${place.placeId}-${placeIndex}`,
              position: {
                lat: place.latitude,
                lng: place.longitude,
              },
              title: place.name ?? '이름 없는 장소',
            },
          ];
        })
        .map((markerPlace, markerIndex) => ({
          ...markerPlace,
          order: markerIndex + 1,
        })),
    [activeDay],
  );
  const positions = useMemo(
    () => markerPlaces.map(({ position }) => position),
    [markerPlaces],
  );
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const handlePreviousDayClick = () => {
    setSelectedDayIndex(
      activeDayIndex === 0 ? sortedDays.length - 1 : activeDayIndex - 1,
    );
  };

  const handleNextDayClick = () => {
    setSelectedDayIndex(
      activeDayIndex === sortedDays.length - 1 ? 0 : activeDayIndex + 1,
    );
  };

  const navigation =
    sortedDays.length > 1 ? (
      <>
        <button
          type="button"
          aria-label="이전 날짜 일정 보기"
          className="focus-visible:outline-mint-300 absolute top-1/2 left-2.5 z-10 flex size-[30px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
          onClick={handlePreviousDayClick}
        >
          <ChevronLeftIcon className="size-6" />
        </button>
        <button
          type="button"
          aria-label="다음 날짜 일정 보기"
          className="focus-visible:outline-mint-300 absolute top-1/2 right-2.5 z-10 flex size-[30px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
          onClick={handleNextDayClick}
        >
          <ChevronRightIcon className="size-6" />
        </button>
      </>
    ) : null;

  if (!activeDay) {
    return (
      <section
        aria-label="날짜별 코스 지도"
        className="flex h-60 w-full items-center justify-center rounded-2xl bg-gray-50"
      >
        <p className="text-body-r-14 text-gray-500">등록된 일정이 없어요</p>
      </section>
    );
  }

  let mapContent: React.ReactNode;

  if (markerPlaces.length === 0) {
    mapContent = (
      <div className="flex h-full items-center justify-center">
        <p className="text-body-r-14 text-gray-500">장소 위치 정보가 없어요</p>
      </div>
    );
  } else if (hasMapLoadError) {
    mapContent = (
      <AsyncErrorState
        className="min-h-full py-4"
        title="지도를 불러오지 못했어요"
        onRetry={() => setHasMapLoadError(false)}
      />
    );
  } else if (!apiKey || !mapId) {
    mapContent = (
      <div className="flex h-full items-center justify-center">
        <p className="text-body-r-14 text-gray-500">지도를 표시할 수 없어요</p>
      </div>
    );
  } else {
    mapContent = (
      <APIProvider apiKey={apiKey} onError={() => setHasMapLoadError(true)}>
        <Map
          mapId={mapId}
          defaultCenter={positions[0]}
          defaultZoom={SINGLE_PLACE_ZOOM}
          maxZoom={16}
          gestureHandling="cooperative"
          disableDefaultUI
          reuseMaps
        >
          <CourseDetailMapViewport positions={positions} />

          {positions.length > 1 ? (
            <Polyline
              path={positions}
              strokeColor="#474b54"
              strokeOpacity={0}
              strokeWeight={1}
              icons={COURSE_LINE_ICONS}
              zIndex={1}
            />
          ) : null}

          {markerPlaces.map(({ key, order, position, title }) => (
            <CourseDetailMapMarker
              key={key}
              order={order}
              position={position}
              title={title}
            />
          ))}
        </Map>
      </APIProvider>
    );
  }

  return (
    <section
      aria-label="날짜별 코스 지도"
      className="relative h-60 w-full overflow-hidden rounded-2xl bg-gray-50"
    >
      {mapContent}
      {navigation}
      <p aria-live="polite" className="sr-only">
        {`${activeDay.dayNumber}일차 일정`}
      </p>
    </section>
  );
};

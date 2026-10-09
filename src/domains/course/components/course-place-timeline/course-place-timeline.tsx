import { cn } from '@/lib/cn';
import { XCircleIcon } from '@/shared/components/icons';

interface CoursePlaceTimelineItem {
  placeId: string;
  name: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  country?: string | null;
  city?: string | null;
}

const EARTH_RADIUS_METERS = 6_371_000;

const toRadians = (degree: number) => (degree * Math.PI) / 180;

const getPlaceDistance = (
  currentPlace: CoursePlaceTimelineItem,
  nextPlace: CoursePlaceTimelineItem,
) => {
  const { latitude: currentLatitude, longitude: currentLongitude } =
    currentPlace;
  const { latitude: nextLatitude, longitude: nextLongitude } = nextPlace;

  if (
    currentLatitude == null ||
    currentLongitude == null ||
    nextLatitude == null ||
    nextLongitude == null
  ) {
    return null;
  }

  const latitudeDelta = toRadians(nextLatitude - currentLatitude);
  const longitudeDelta = toRadians(nextLongitude - currentLongitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(currentLatitude)) *
      Math.cos(toRadians(nextLatitude)) *
      Math.sin(longitudeDelta / 2) ** 2;

  return Math.round(
    EARTH_RADIUS_METERS *
      2 *
      Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)),
  );
};

const formatPlaceDistance = (distance: number | null) => {
  if (distance == null) {
    return '-';
  }

  if (distance < 1_000) {
    return `${distance}m`;
  }

  return `${(distance / 1_000).toFixed(1)}km`;
};

const formatPlaceLocation = (place: CoursePlaceTimelineItem) => {
  const location = [place.country, place.city].filter(Boolean).join(' · ');

  return location || place.address || '위치 정보 없음';
};

interface CoursePlaceTimelineProps {
  places: CoursePlaceTimelineItem[];
  onPlaceRemove?: (placeId: string) => void;
  tone?: 'accent' | 'neutral';
}

export const CoursePlaceTimeline = ({
  places,
  onPlaceRemove,
  tone = 'neutral',
}: CoursePlaceTimelineProps) => {
  if (places.length === 0) {
    return null;
  }

  const placeOccurrences = new Map<string, number>();

  return (
    <ol className="flex flex-col gap-4" aria-label="장소 방문 순서">
      {places.map((place, index) => {
        const occurrence = placeOccurrences.get(place.placeId) ?? 0;
        const nextPlace = places[index + 1];
        const distance = nextPlace
          ? formatPlaceDistance(getPlaceDistance(place, nextPlace))
          : null;
        const distanceLabel =
          nextPlace &&
          `다음 장소까지 ${distance === '-' ? '거리 정보 없음' : distance}`;

        placeOccurrences.set(place.placeId, occurrence + 1);

        return (
          <li
            key={`${place.placeId}-${occurrence}`}
            className="grid min-h-18.5 grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4"
          >
            <div className="relative flex min-h-18.5 items-center justify-center">
              <span
                className={cn(
                  'text-caption-m-10 z-10 flex size-5.5 items-center justify-center rounded-full font-bold text-white',
                  tone === 'accent' ? 'bg-mint-300' : 'bg-gray-800',
                )}
                aria-hidden="true"
              >
                {index + 1}
              </span>

              {nextPlace && (
                <>
                  <span
                    className="absolute top-1/2 left-1/2 h-[calc(100%+16px)] w-0.5 -translate-x-1/2 bg-gray-100"
                    aria-hidden="true"
                  />
                  <span
                    className="text-caption-m-10 absolute top-[calc(100%+8px)] left-1/2 z-20 flex h-5 min-w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white px-1 text-gray-500"
                    aria-hidden="true"
                  >
                    {distance}
                  </span>
                </>
              )}
            </div>

            <div
              className={cn(
                'relative flex min-h-18.5 min-w-0 flex-col justify-center rounded-xl border border-gray-100 py-4 pl-4',
                onPlaceRemove ? 'pr-14' : 'pr-4',
              )}
            >
              <p className="text-body-sb-15 truncate text-gray-800">
                {place.name ?? '이름 없는 장소'}
              </p>
              <p className="text-caption-m-10 mt-0.5 truncate text-gray-500">
                {formatPlaceLocation(place)}
              </p>
              {distanceLabel && (
                <span className="sr-only">{distanceLabel}</span>
              )}
              {onPlaceRemove && (
                <button
                  aria-label={`${place.name ?? '이름 없는 장소'} 장소 삭제`}
                  className="focus-visible:outline-mint-300 absolute top-1/2 right-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
                  type="button"
                  onClick={() => onPlaceRemove(place.placeId)}
                >
                  <XCircleIcon className="size-6 text-gray-100" />
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { PLACE_QUERY_OPTIONS } from '@/domains/course/api/query';
import type { Place } from '@/domains/course/api/type';
import { CourseBottomSheet } from '@/domains/course/components/course-bottom-sheet/course-bottom-sheet';
import { CourseMap } from '@/domains/course/components/course-map/course-map';
import { MapFloatingControls } from '@/domains/course/components/map-floating-controls/map-floating-controls';
import { useCourseBrowse } from '@/domains/course/features/course-browse/course-browse-provider';
import { cn } from '@/lib/cn';
import {
  AccommodationIcon,
  CafeIcon,
  FoodIcon,
  SightseeingIcon,
} from '@/shared/components/icons';
import { Header } from '@/shared/components/layout';
import { ChipButton, Searchbar, useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

const MAP_CATEGORY_ITEMS = [
  { key: 'sightseeing', label: '관광', icon: SightseeingIcon },
  { key: 'food', label: '음식', icon: FoodIcon },
  { key: 'cafe', label: '카페', icon: CafeIcon },
  { key: 'accommodation', label: '숙소', icon: AccommodationIcon },
] as const;

type MapCategory = (typeof MAP_CATEGORY_ITEMS)[number]['key'];
const EMPTY_COURSE_ITEMS = [] as const;
const NEARBY_PLACE_RADIUS_METERS = 1500;
const API_CATEGORY_BY_MAP_CATEGORY = {
  sightseeing: 'TOURISM',
  food: 'RESTAURANT',
  cafe: 'CAFE',
  accommodation: 'ACCOMMODATION',
} as const satisfies Record<MapCategory, string>;

export default function CoursePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    bottomSheetPosition,
    bottomSheetTab,
    currentLocation,
    currentLocationStatus,
    getMapCamera,
    isBookmarkActive,
    isLocationActive,
    refetchCurrentLocation,
    searchKeyword,
    selectedCategory,
    setBottomSheetPosition,
    setBottomSheetTab,
    setIsBookmarkActive,
    setIsLocationActive,
    setMapCamera,
    setSearchKeyword,
    setSelectedCategory,
  } = useCourseBrowse();
  const [restoredMapCamera, setRestoredMapCamera] = useState(getMapCamera);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();
  const [selectedMapPlace, setSelectedMapPlace] = useState<Place>();
  const nearbyPlaceParams = currentLocation
    ? {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        radius: NEARBY_PLACE_RADIUS_METERS,
        category: selectedCategory
          ? API_CATEGORY_BY_MAP_CATEGORY[selectedCategory]
          : undefined,
      }
    : null;
  const {
    data: nearbyPlaces = [],
    isError: hasNearbyError,
    isPending: isNearbyLoading,
    refetch: refetchNearbyPlaces,
  } = useQuery(PLACE_QUERY_OPTIONS.NEARBY(nearbyPlaceParams));
  const nearbyItems = useMemo(() => {
    const selectedPlace =
      selectedMapPlace?.placeId === selectedPlaceId
        ? selectedMapPlace
        : nearbyPlaces.find(({ placeId }) => placeId === selectedPlaceId);
    const orderedPlaces = selectedPlace
      ? [
          selectedPlace,
          ...nearbyPlaces.filter(
            ({ placeId }) => placeId !== selectedPlace.placeId,
          ),
        ]
      : nearbyPlaces;

    return orderedPlaces.map((place) => ({
      place,
      description:
        [place.country, place.city].filter(Boolean).join(' · ') ||
        '위치 정보 없음',
    }));
  }, [nearbyPlaces, selectedMapPlace, selectedPlaceId]);

  const handleCategoryChange = (category: MapCategory) => {
    setSelectedPlaceId(undefined);
    setSelectedMapPlace(undefined);
    setSelectedCategory((currentCategory) =>
      currentCategory === category ? undefined : category,
    );
  };

  const handleLocationClick = async () => {
    if (isLocationActive) {
      setIsLocationActive(false);
      return;
    }

    if (currentLocationStatus === 'loading') return;

    const location = await refetchCurrentLocation();

    if (!location) {
      showToast('위치 권한을 확인하거나 다시 시도해 주세요', {
        variant: 'gray',
      });
      return;
    }

    setBottomSheetPosition('default');
    setRestoredMapCamera(null);
    setMapCamera(null);
    setSelectedPlaceId(undefined);
    setSelectedMapPlace(undefined);
    setIsLocationActive(true);
  };

  const handlePlaceSelect = (placeId: string) => {
    setSelectedPlaceId(placeId);
    setSelectedMapPlace(undefined);
    setIsLocationActive(false);
    setIsBookmarkActive(false);
    setBottomSheetTab('nearby');
    setBottomSheetPosition('default');
  };

  const handleMapPlaceSelect = (place: Place) => {
    setSelectedPlaceId(place.placeId);
    setSelectedMapPlace(place);
    setIsLocationActive(false);
    setIsBookmarkActive(false);
    setBottomSheetTab('nearby');
    setBottomSheetPosition('default');
  };

  return (
    <>
      <main className="fixed inset-0 mx-auto w-full max-w-107.5 min-w-93.75 pb-14.5">
        <Header
          className="absolute top-0 left-0 z-10 bg-transparent"
          hasBackButton
          content={
            <Searchbar
              aria-label="장소 검색"
              containerClassName="bg-white"
              searchIconClassName="text-gray-200"
              size="small"
              value={searchKeyword}
              onChange={setSearchKeyword}
            />
          }
        />

        <div className="absolute top-15 left-0 z-10 flex w-full gap-2 px-5">
          {MAP_CATEGORY_ITEMS.map(({ key, label, icon: Icon }) => (
            <ChipButton
              key={key}
              active={selectedCategory === key}
              className="text-caption-m-12 h-8.5 w-16.75 gap-1 px-3 py-2 shadow-[0_2px_4px_0_rgba(0,0,0,0.12)]"
              variant="fillMedium"
              onClick={() => handleCategoryChange(key)}
            >
              <Icon className="size-5" />
              {label}
            </ChipButton>
          ))}
        </div>

        <CourseMap
          bottomOverlayRatio={
            bottomSheetPosition === 'default' ? 0.59 : undefined
          }
          cameraTarget={isLocationActive ? currentLocation : null}
          currentLocation={currentLocation}
          initialCamera={restoredMapCamera}
          places={nearbyPlaces}
          preserveCamera={
            restoredMapCamera !== null || bottomSheetPosition === 'expanded'
          }
          selectedPlaceId={selectedPlaceId}
          showCurrentLocation={isLocationActive}
          onCameraChange={setMapCamera}
          onMapPlaceSelect={handleMapPlaceSelect}
          onPlaceSelect={handlePlaceSelect}
        />

        <div
          className={cn(
            'absolute right-4 z-10',
            bottomSheetPosition === 'default'
              ? 'bottom-[calc(59dvh+16px)]'
              : 'top-15',
          )}
        >
          <MapFloatingControls
            isBookmarkActive={isBookmarkActive}
            isLocationActive={isLocationActive}
            onBookmarkClick={() => setIsBookmarkActive((active) => !active)}
            onLocationClick={handleLocationClick}
          />
        </div>

        <CourseBottomSheet
          open
          position={bottomSheetPosition}
          tab={bottomSheetTab}
          bookmarkedItems={EMPTY_COURSE_ITEMS}
          hasNearbyError={hasNearbyError}
          isBookmarkMode={isBookmarkActive}
          isNearbyLoading={isNearbyLoading}
          nearbyItems={nearbyItems}
          onClose={() => setBottomSheetPosition('collapsed')}
          onPositionChange={setBottomSheetPosition}
          onTabChange={setBottomSheetTab}
          onBookmarkChange={() => {}}
          onExploreClick={() => router.push(ROUTES.COURSE.CUSTOMIZED_EXPLORE)}
          onNearbyRetry={() => void refetchNearbyPlaces()}
          onSuggestedMoreClick={() =>
            router.push(ROUTES.COURSE.SUGGEST_EXPLORE)
          }
        />
      </main>
    </>
  );
}

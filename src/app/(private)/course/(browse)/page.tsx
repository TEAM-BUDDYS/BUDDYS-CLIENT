'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CourseBottomSheet } from '@/domains/course/components/course-bottom-sheet/course-bottom-sheet';
import { CourseMap } from '@/domains/course/components/course-map/course-map';
import { MapFloatingControls } from '@/domains/course/components/map-floating-controls/map-floating-controls';
import { useCourseBrowse } from '@/domains/course/features/course-browse/course-browse-provider';
import { useBookmarkedPlaceMarkers } from '@/domains/course/features/course-browse/use-bookmarked-place-markers';
import { useBookmarkedPlaces } from '@/domains/course/features/course-browse/use-bookmarked-places';
import { useCoursePlaceSelection } from '@/domains/course/features/course-browse/use-course-place-selection';
import { useNearbyPlaces } from '@/domains/course/features/course-browse/use-nearby-places';
import { usePlaceBookmark } from '@/domains/course/features/course-browse/use-place-bookmark';
import type { CourseMapBounds } from '@/domains/course/model/course-map';
import {
  type CourseMapCategory,
  mergeCoursePlaces,
} from '@/domains/course/model/course-place';
import type { GoogleMapPoi } from '@/domains/course/model/google-place';
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

export default function CoursePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [mapBounds, setMapBounds] = useState<CourseMapBounds | null>(null);
  const [bookmarkMarkerDataUpdatedAtAtClick, setBookmarkMarkerDataUpdatedAt] =
    useState<number | null>(null);
  const {
    bottomSheetPosition,
    bottomSheetTab,
    currentLocation,
    currentLocationStatus,
    isBookmarkMode,
    isLocationActive,
    refetchCurrentLocation,
    searchKeyword,
    selectedCategory,
    setBottomSheetPosition,
    setBottomSheetTab,
    setIsBookmarkMode,
    setIsLocationActive,
    setSearchKeyword,
    setSelectedCategory,
  } = useCourseBrowse();
  const {
    hasError: hasNearbyError,
    hasNextPage: hasNearbyNextPage,
    isFetchNextPageError: isNearbyFetchNextPageError,
    isFetchingNextPage: isNearbyFetchingNextPage,
    isLoading: isNearbyLoading,
    isSearchMode,
    loadMore: loadMoreNearbyPlaces,
    places: nearbyPlaces,
    refetch: refetchNearbyPlaces,
  } = useNearbyPlaces({
    currentLocation,
    searchKeyword,
    selectedCategory,
  });
  const bookmarkedMarkers = useBookmarkedPlaceMarkers({ bounds: mapBounds });
  const {
    clearSelectedPlace,
    nearbyItems,
    selectedPlace,
    selectedPlaceId,
    selectGooglePlace,
    selectNearbyPlace,
    updateSelectedPlaceBookmark,
  } = useCoursePlaceSelection({
    nearbyPlaces,
    bookmarkedPlaces: bookmarkedMarkers.places,
  });
  const { pendingPlaceIds: pendingBookmarkPlaceIds, updateBookmark } =
    usePlaceBookmark({
      onBookmarkChange: updateSelectedPlaceBookmark,
    });
  const bookmarkedList = useBookmarkedPlaces({ enabled: isBookmarkMode });
  const mapPlaces = useMemo(
    () =>
      mergeCoursePlaces(
        isBookmarkMode ? [] : nearbyPlaces,
        bookmarkedMarkers.places,
        selectedPlace?.bookmarked ? [selectedPlace] : [],
      ),
    [bookmarkedMarkers.places, isBookmarkMode, nearbyPlaces, selectedPlace],
  );

  const handleMapBoundsChange = useCallback((bounds: CourseMapBounds) => {
    setMapBounds((currentBounds) => {
      if (
        currentBounds?.swLat === bounds.swLat &&
        currentBounds.swLng === bounds.swLng &&
        currentBounds.neLat === bounds.neLat &&
        currentBounds.neLng === bounds.neLng
      ) {
        return currentBounds;
      }

      return bounds;
    });
  }, []);

  useEffect(() => {
    if (currentLocationStatus !== 'idle') return;

    void refetchCurrentLocation();
  }, [currentLocationStatus, refetchCurrentLocation]);

  const isCurrentLocationLoading =
    currentLocationStatus === 'idle' || currentLocationStatus === 'loading';
  const hasLocationError = currentLocationStatus === 'error';
  const isWaitingForBookmarkMarkers =
    bookmarkMarkerDataUpdatedAtAtClick !== null &&
    bookmarkedMarkers.isLoading &&
    bookmarkedMarkers.dataUpdatedAt === bookmarkMarkerDataUpdatedAtAtClick;

  const handleCategoryChange = (category: CourseMapCategory) => {
    clearSelectedPlace();
    setSelectedCategory((currentCategory) =>
      currentCategory === category ? undefined : category,
    );
  };

  const handleSearchKeywordChange = (keyword: string) => {
    clearSelectedPlace();
    setIsBookmarkMode(false);
    setBottomSheetTab('nearby');
    if (
      keyword.trim() &&
      (!searchKeyword.trim() || isBookmarkMode || bottomSheetTab !== 'nearby')
    ) {
      setBottomSheetPosition('default');
    }
    setSearchKeyword(keyword);
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

    clearSelectedPlace();
    setIsLocationActive(true);
  };

  const handleBookmarkModeClick = () => {
    const nextBookmarkMode = !isBookmarkMode;

    setIsBookmarkMode(nextBookmarkMode);

    if (nextBookmarkMode) {
      setIsLocationActive(false);
      setBottomSheetPosition('default');
    }
  };

  const openSelectedPlace = (preserveBookmarkMode = false) => {
    setIsLocationActive(false);

    if (!preserveBookmarkMode) {
      setIsBookmarkMode(false);
      setBottomSheetTab('nearby');
    }
    setBottomSheetPosition('default');
  };

  const handlePlaceSelect = (placeId: string) => {
    const place = selectNearbyPlace(placeId);

    if (place) openSelectedPlace(isBookmarkMode && place.bookmarked);
  };

  const handlePoiSelect = async (poi: GoogleMapPoi) => {
    setBookmarkMarkerDataUpdatedAt(
      bookmarkedMarkers.isLoading ? bookmarkedMarkers.dataUpdatedAt : null,
    );
    setIsLocationActive(false);
    setBottomSheetPosition('default');

    try {
      const place = await selectGooglePlace(poi);

      if (place) openSelectedPlace(isBookmarkMode && place.bookmarked);
    } catch {
      setBookmarkMarkerDataUpdatedAt(null);
      showToast('장소 정보를 불러오지 못했어요', { variant: 'gray' });
    }
  };

  const handleBookmarkChange = async (
    placeId: string,
    nextBookmarked: boolean,
  ) => {
    try {
      await updateBookmark({ placeId, nextBookmarked });
    } catch {
      showToast(
        nextBookmarked
          ? '장소를 저장하지 못했어요'
          : '장소 저장을 취소하지 못했어요',
        { variant: 'gray' },
      );
    }
  };

  const handleNearbyRetry = () => {
    if (!isSearchMode && hasLocationError) {
      void refetchCurrentLocation();
      return;
    }

    void refetchNearbyPlaces();
  };

  const handleBookmarkRetry = () => {
    if (bookmarkedList.hasError) {
      void bookmarkedList.refetch();
    }

    if (bookmarkedMarkers.hasError) {
      void bookmarkedMarkers.refetch();
    }
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
              onChange={handleSearchKeywordChange}
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
          key={currentLocation ? 'current-location' : 'fallback-location'}
          bottomOverlayRatio={
            bottomSheetPosition === 'default' ? 0.59 : undefined
          }
          cameraTarget={isLocationActive ? currentLocation : null}
          currentLocation={currentLocation}
          places={mapPlaces}
          preserveCamera={bottomSheetPosition === 'expanded'}
          selectedPlace={selectedPlace}
          selectedPlaceId={selectedPlaceId}
          showCurrentLocation={isLocationActive}
          onBoundsChange={handleMapBoundsChange}
          onPlaceSelect={handlePlaceSelect}
          onPoiSelect={(poi) => void handlePoiSelect(poi)}
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
            isBookmarkMode={isBookmarkMode}
            isLocationActive={isLocationActive}
            onBookmarkClick={handleBookmarkModeClick}
            onLocationClick={handleLocationClick}
          />
        </div>

        <CourseBottomSheet
          open
          position={bottomSheetPosition}
          tab={bottomSheetTab}
          bookmarkedItems={bookmarkedList.items}
          hasBookmarkError={
            bookmarkedList.hasError || bookmarkedMarkers.hasError
          }
          hasBookmarkNextPage={bookmarkedList.hasNextPage}
          hasNearbyError={hasNearbyError}
          hasNearbyNextPage={hasNearbyNextPage}
          hasLocationError={!isSearchMode && hasLocationError}
          isBookmarkMode={isBookmarkMode}
          isBookmarkFetchNextPageError={bookmarkedList.isFetchNextPageError}
          isBookmarkFetchingNextPage={bookmarkedList.isFetchingNextPage}
          isBookmarkLoading={bookmarkedList.isLoading}
          isNearbyLoading={
            (!isSearchMode && isCurrentLocationLoading) || isNearbyLoading
          }
          isNearbySearchMode={isSearchMode}
          isNearbyFetchNextPageError={isNearbyFetchNextPageError}
          isNearbyFetchingNextPage={isNearbyFetchingNextPage}
          isPlaceSelectionLoading={isWaitingForBookmarkMarkers}
          nearbyItems={nearbyItems}
          pendingBookmarkPlaceIds={pendingBookmarkPlaceIds}
          onClose={() => setBottomSheetPosition('collapsed')}
          onPositionChange={setBottomSheetPosition}
          onTabChange={setBottomSheetTab}
          onBookmarkChange={(placeId, nextBookmarked) =>
            void handleBookmarkChange(placeId, nextBookmarked)
          }
          onBookmarkLoadMore={bookmarkedList.loadMore}
          onBookmarkRetry={handleBookmarkRetry}
          onExploreClick={() => router.push(ROUTES.COURSE.CUSTOMIZED_EXPLORE)}
          onNearbyRetry={handleNearbyRetry}
          onNearbyLoadMore={loadMoreNearbyPlaces}
          onSuggestedMoreClick={() =>
            router.push(ROUTES.COURSE.SUGGEST_EXPLORE)
          }
        />
      </main>
    </>
  );
}

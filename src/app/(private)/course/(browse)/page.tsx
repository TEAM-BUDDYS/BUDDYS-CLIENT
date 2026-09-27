'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

  const handleCategoryChange = (category: MapCategory) => {
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
    setIsLocationActive(true);
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
          places={[]}
          preserveCamera={
            restoredMapCamera !== null || bottomSheetPosition === 'expanded'
          }
          showCurrentLocation={isLocationActive}
          onCameraChange={setMapCamera}
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
          isBookmarkMode={isBookmarkActive}
          nearbyItems={EMPTY_COURSE_ITEMS}
          onClose={() => setBottomSheetPosition('collapsed')}
          onPositionChange={setBottomSheetPosition}
          onTabChange={setBottomSheetTab}
          onBookmarkChange={() => {}}
          onExploreClick={() => router.push(ROUTES.COURSE.CUSTOMIZED_EXPLORE)}
          onSuggestedMoreClick={() =>
            router.push(ROUTES.COURSE.SUGGEST_EXPLORE)
          }
        />
      </main>
    </>
  );
}

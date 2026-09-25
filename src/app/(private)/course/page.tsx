'use client';

import { useState } from 'react';

import {
  CourseBottomSheet,
  type CourseBottomSheetPosition,
} from '@/domains/course/components/course-bottom-sheet/course-bottom-sheet';
import { CourseMap } from '@/domains/course/components/course-map/course-map';
import { MapFloatingControls } from '@/domains/course/components/map-floating-controls/map-floating-controls';
import { cn } from '@/lib/cn';
import {
  AccommodationIcon,
  CafeIcon,
  FoodIcon,
  SightseeingIcon,
} from '@/shared/components/icons';
import { BottomNavigation, Header } from '@/shared/components/layout';
import { ChipButton, Searchbar } from '@/shared/components/ui';

const MAP_CATEGORY_ITEMS = [
  { key: 'sightseeing', label: '관광', icon: SightseeingIcon },
  { key: 'food', label: '음식', icon: FoodIcon },
  { key: 'cafe', label: '카페', icon: CafeIcon },
  { key: 'accommodation', label: '숙소', icon: AccommodationIcon },
] as const;

type MapCategory = (typeof MAP_CATEGORY_ITEMS)[number]['key'];

export default function CoursePage() {
  const [bottomSheetPosition, setBottomSheetPosition] =
    useState<CourseBottomSheetPosition>('default');
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const [isLocationActive, setIsLocationActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MapCategory>();

  const handleCategoryChange = (category: MapCategory) => {
    setSelectedCategory((currentCategory) =>
      currentCategory === category ? undefined : category,
    );
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

        <CourseMap places={[]} />

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
            onLocationClick={() => setIsLocationActive((active) => !active)}
          />
        </div>

        <CourseBottomSheet
          open
          position={bottomSheetPosition}
          nearbyItems={[]}
          onClose={() => setBottomSheetPosition('collapsed')}
          onPositionChange={setBottomSheetPosition}
          onBookmarkChange={() => {}}
          onExploreClick={() => {}}
          onSuggestedMoreClick={() => {}}
        />
      </main>

      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
    </>
  );
}

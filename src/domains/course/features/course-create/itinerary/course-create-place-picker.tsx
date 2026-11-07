'use client';

import type { ComponentType, KeyboardEvent, SVGProps } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Place } from '@/domains/course/api/type';
import { CourseMap } from '@/domains/course/components/course-map/course-map';
import { useCoursePlaceSelection } from '@/domains/course/hook/use-course-place-selection';
import type { CourseMapCenter } from '@/domains/course/model/course-map';
import {
  type CourseMapCategory,
  mergeCoursePlaces,
} from '@/domains/course/model/course-place';
import type { GoogleMapPoi } from '@/domains/course/model/google-place';
import { cn } from '@/lib/cn';
import {
  AccommodationIcon,
  BookmarkIcon,
  CafeIcon,
  ChevronLeftIcon,
  FoodIcon,
  SightseeingIcon,
} from '@/shared/components/icons';
import {
  BottomSheet,
  Button,
  ChipButton,
  IconButton,
  Searchbar,
  useToast,
} from '@/shared/components/ui';
import { useVirtualKeyboard } from '@/shared/hooks/use-virtual-keyboard';

import { COURSE_CREATE_MAX_DAY_PLACE_COUNT } from '../constants';
import type {
  CourseCreateCityOption,
  CourseCreateDayFormState,
} from '../model';
import { CourseCreatePlaceResultList } from './course-create-place-result-list';
import { useCoursePlaceResults } from './use-course-place-results';

const PLACE_CATEGORIES: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: CourseMapCategory;
}[] = [
  { icon: SightseeingIcon, label: '관광', value: 'sightseeing' },
  { icon: FoodIcon, label: '음식', value: 'food' },
  { icon: CafeIcon, label: '카페', value: 'cafe' },
  { icon: AccommodationIcon, label: '숙소', value: 'accommodation' },
];

const RESULT_SHEET_OVERLAY_RATIO = 0.57;

const PLACE_RESULT_MESSAGES = {
  nearby: {
    label: '주변 장소',
    emptyMessage: '주변 장소가 없어요.',
  },
  search: {
    label: '장소 검색 결과',
    emptyMessage: '검색 결과가 없어요.',
  },
  bookmark: {
    label: '최근 저장 장소',
    emptyMessage: '최근 저장한 장소가 없어요.',
  },
};

interface CourseCreatePlacePickerProps {
  cities: CourseCreateCityOption[];
  dayNumber: CourseCreateDayFormState['dayNumber'];
  fallbackPlaces: CourseCreateDayFormState['places'];
  selectedPlaces: CourseCreateDayFormState['places'];
  onClose: () => void;
  onConfirm: (places: CourseCreateDayFormState['places']) => void;
}

export const CourseCreatePlacePicker = ({
  cities,
  dayNumber,
  fallbackPlaces,
  selectedPlaces,
  onClose,
  onConfirm,
}: CourseCreatePlacePickerProps) => {
  const { showToast } = useToast();
  const isVirtualKeyboardOpen = useVirtualKeyboard();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<CourseMapCategory>();
  const [draftPlaces, setDraftPlaces] = useState(selectedPlaces);
  const [pinnedPlace, setPinnedPlace] = useState<Place>();
  const [cameraRequestId, setCameraRequestId] = useState(0);
  const [isBookmarkMode, setIsBookmarkMode] = useState(false);
  const [nearbyCenter, setNearbyCenter] = useState<CourseMapCenter | null>(
    null,
  );
  const mapCenterRef = useRef<CourseMapCenter | null>(null);
  const resultScrollRef = useRef<HTMLDivElement>(null);
  const [isResultSheetOpen, setIsResultSheetOpen] = useState(true);
  const isResultSheetVisible = isResultSheetOpen && !isVirtualKeyboardOpen;
  const isBookmarkSheetOpen = isBookmarkMode && isResultSheetOpen;
  const placeResults = useCoursePlaceResults({
    cities,
    fallbackPlaces,
    keyword,
    category,
    nearbyCenter,
    isBookmarkMode,
    isSheetOpen: isResultSheetOpen,
  });
  const visiblePlaces = useMemo(
    () =>
      pinnedPlace
        ? mergeCoursePlaces([pinnedPlace], placeResults.places)
        : placeResults.places,
    [pinnedPlace, placeResults.places],
  );
  const hasVisiblePlaces = visiblePlaces.length > 0;
  const resultMessages = PLACE_RESULT_MESSAGES[placeResults.mode];
  const {
    clearSelectedPlace,
    selectedPlace: focusedPlace,
    selectGooglePlace,
    selectNearbyPlace,
  } = useCoursePlaceSelection({ nearbyPlaces: visiblePlaces });
  const selectedPlaceIds = new Set(draftPlaces.map(({ placeId }) => placeId));

  useEffect(() => {
    if (!pinnedPlace || !isResultSheetVisible) return;

    resultScrollRef.current?.scrollTo({ top: 0 });
  }, [isResultSheetVisible, pinnedPlace]);

  const clearPlacePreview = () => {
    clearSelectedPlace();
    setPinnedPlace(undefined);
  };

  const handleKeywordChange = (value: string) => {
    if (value.trim().length === 0) {
      setNearbyCenter(mapCenterRef.current ?? placeResults.searchCenter);
    }

    setKeyword(value);
    setIsBookmarkMode(false);
    clearPlacePreview();
    setIsResultSheetOpen(true);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;

    setIsResultSheetOpen(true);
    event.currentTarget.blur();
  };

  const handleMapCenterChange = useCallback((center: CourseMapCenter) => {
    mapCenterRef.current = center;
  }, []);

  const handleCategoryChange = (nextCategory: CourseMapCategory) => {
    setCategory((currentCategory) =>
      currentCategory === nextCategory ? undefined : nextCategory,
    );
    setNearbyCenter(mapCenterRef.current ?? placeResults.searchCenter);
    setIsBookmarkMode(false);
    clearPlacePreview();
    setIsResultSheetOpen(true);
  };

  const handleBookmarkClick = () => {
    setIsBookmarkMode(!isBookmarkMode || !isResultSheetOpen);
    setKeyword('');
    setCategory(undefined);
    setNearbyCenter(mapCenterRef.current ?? placeResults.searchCenter);
    clearPlacePreview();
    setIsResultSheetOpen(true);
  };

  const handlePlaceFocus = (placeId: string) => {
    const place = selectNearbyPlace(placeId);

    if (!place) return;

    setCameraRequestId((requestId) => requestId + 1);
    setIsResultSheetOpen(true);
    return place;
  };

  const handleMapPlaceSelect = (placeId: string) => {
    const place = handlePlaceFocus(placeId);

    if (place) setPinnedPlace(place);

    return place;
  };

  const handlePoiSelect = async (poi: GoogleMapPoi) => {
    setIsBookmarkMode(false);
    setIsResultSheetOpen(true);

    const knownPlace = handleMapPlaceSelect(poi.placeId);

    if (knownPlace) return;

    try {
      const place = await selectGooglePlace(poi);

      if (place) {
        setPinnedPlace(place);
        setCameraRequestId((requestId) => requestId + 1);
      }
    } catch {
      showToast('장소 정보를 불러오지 못했어요', { variant: 'gray' });
    }
  };

  const handleResultSheetClose = () => {
    clearPlacePreview();
    setIsResultSheetOpen(false);
  };

  const handleClose = () => {
    clearPlacePreview();
    onClose();
  };

  const handlePlaceSelect = (placeId: string) => {
    if (selectedPlaceIds.has(placeId)) {
      setDraftPlaces((currentPlaces) =>
        currentPlaces.filter((place) => place.placeId !== placeId),
      );
      return;
    }

    const place = visiblePlaces.find((item) => item.placeId === placeId);

    if (!place || !place.name) {
      showToast('장소 이름이 없어 코스에 추가할 수 없어요.', {
        variant: 'gray',
      });
      return;
    }

    if (draftPlaces.length >= COURSE_CREATE_MAX_DAY_PLACE_COUNT) {
      showToast('하루에 최대 10개의 장소를 추가할 수 있어요');
      return;
    }

    setDraftPlaces((currentPlaces) => [...currentPlaces, place]);
  };

  const handlePlaceFocusAndSelect = (placeId: string) => {
    handlePlaceFocus(placeId);
    handlePlaceSelect(placeId);
  };

  const handleConfirm = () => {
    onConfirm(draftPlaces);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-40 mx-auto max-w-107.5 overflow-hidden bg-white">
      <CourseMap
        bottomOverlayRatio={
          isResultSheetVisible ? RESULT_SHEET_OVERLAY_RATIO : 0
        }
        currentLocation={placeResults.searchCenter}
        cameraRequestId={cameraRequestId}
        selectedPlace={focusedPlace}
        places={visiblePlaces}
        onCenterChange={handleMapCenterChange}
        onPlaceSelect={handleMapPlaceSelect}
        onPoiSelect={(poi) => void handlePoiSelect(poi)}
      />

      <div className="absolute top-2 right-4 left-2 z-10 flex items-center">
        <button
          aria-label="장소 선택 닫기"
          className="flex size-11 shrink-0 items-center justify-center text-gray-800"
          type="button"
          onClick={handleClose}
        >
          <ChevronLeftIcon aria-hidden className="size-6" />
        </button>
        <div className="min-w-0 flex-1 rounded-xl bg-white shadow-[0_2px_2px_rgba(0,0,0,0.2)] [&>div]:bg-white">
          <Searchbar
            aria-label="장소 검색"
            enterKeyHint="search"
            size="small"
            value={keyword}
            placeholder="검색어를 입력해주세요"
            onChange={handleKeywordChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      </div>

      <div className="absolute top-17 left-5 z-10 flex max-w-[calc(100%-40px)] scrollbar-none gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {PLACE_CATEGORIES.map((item) => {
          const CategoryIcon = item.icon;
          const isActive = category === item.value;

          return (
            <ChipButton
              key={item.value}
              active={isActive}
              className={cn(
                'text-caption-m-12 gap-1 border-0 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]',
                isActive ? 'text-mint-300' : 'text-gray-500',
              )}
              onClick={() => handleCategoryChange(item.value)}
            >
              <CategoryIcon aria-hidden className="size-4.5" />
              {item.label}
            </ChipButton>
          );
        })}
      </div>

      <div
        className={cn(
          'absolute right-4 z-10 transition-[bottom] duration-200',
          isResultSheetVisible ? 'bottom-[calc(57dvh+1rem)]' : 'bottom-4',
        )}
      >
        <IconButton
          aria-label={
            isBookmarkSheetOpen ? '최근 저장 목록 닫기' : '최근 저장 목록 열기'
          }
          aria-pressed={isBookmarkSheetOpen}
          className={cn(
            'text-mint-300 size-9 shadow-[0_2px_2px_rgba(0,0,0,0.2)]',
            isBookmarkSheetOpen ? 'bg-gray-100' : 'bg-white',
          )}
          icon={<BookmarkIcon />}
          iconClassName="size-5"
          onClick={handleBookmarkClick}
        />
      </div>

      <BottomSheet
        open={isResultSheetVisible}
        modal={false}
        ariaLabel={`Day ${dayNumber} ${resultMessages.label}`}
        className="flex h-[57dvh] flex-col rounded-t-[20px]"
        handleClassName="h-1.5 w-14"
        onClose={handleResultSheetClose}
      >
        <div className="flex min-h-0 flex-1 flex-col px-4">
          <div
            ref={resultScrollRef}
            className="min-h-0 flex-1 scrollbar-none overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden"
          >
            {hasVisiblePlaces && (
              <CourseCreatePlaceResultList
                places={visiblePlaces}
                selectedPlaceIds={selectedPlaceIds}
                hasNextPage={placeResults.hasNextPage}
                isFetchingNextPage={placeResults.isFetchingNextPage}
                isFetchNextPageError={placeResults.isFetchNextPageError}
                isVisible={isResultSheetVisible}
                onLoadMore={placeResults.loadMore}
                onPlaceFocus={handlePlaceFocus}
                onSelect={handlePlaceFocusAndSelect}
              />
            )}
            {!placeResults.isLoading && placeResults.isError && (
              <div className="flex flex-col items-center py-16">
                <p className="text-body-r-14 text-center text-gray-500">
                  장소를 불러오지 못했어요.
                </p>
                <button
                  className="text-body-sb-14 text-mint-400 mt-3"
                  type="button"
                  onClick={placeResults.retry}
                >
                  다시 시도
                </button>
              </div>
            )}
            {!hasVisiblePlaces &&
              !placeResults.isLoading &&
              !placeResults.isError && (
                <p className="text-body-r-14 py-16 text-center text-gray-500">
                  {resultMessages.emptyMessage}
                </p>
              )}
          </div>

          {(draftPlaces.length > 0 || selectedPlaces.length > 0) && (
            <div className="shrink-0 bg-white pt-3 pb-4">
              <Button onClick={handleConfirm}>
                {`Day ${dayNumber} 일정에 장소 추가하기`}
              </Button>
            </div>
          )}
        </div>
      </BottomSheet>
    </div>
  );
};

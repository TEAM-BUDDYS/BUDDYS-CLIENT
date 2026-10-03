'use client';

import type { ComponentType, SVGProps } from 'react';
import { useState } from 'react';

import type { Place } from '@/domains/course/api/type';
import { CourseSelectCard } from '@/domains/course/components/course-select-card/course-select-card';
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
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

import { COURSE_CREATE_MAX_DAY_PLACE_COUNT } from '../constants';
import type {
  CourseCreateCityOption,
  CourseCreateDayFormState,
} from '../model';
import { CourseCreatePlaceMap } from './course-create-place-map';
import { useCoursePlaceResults } from './use-course-place-results';

type PlaceCategory = NonNullable<Place['category']>;

const PLACE_CATEGORIES: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: PlaceCategory;
}[] = [
  { icon: SightseeingIcon, label: '관광', value: 'TOURISM' },
  { icon: FoodIcon, label: '음식', value: 'RESTAURANT' },
  { icon: CafeIcon, label: '카페', value: 'CAFE' },
  { icon: AccommodationIcon, label: '숙소', value: 'ACCOMMODATION' },
];

interface CourseCreatePlacePickerProps {
  cities: CourseCreateCityOption[];
  dayNumber: CourseCreateDayFormState['dayNumber'];
  selectedPlaces: CourseCreateDayFormState['places'];
  onClose: () => void;
  onConfirm: (places: CourseCreateDayFormState['places']) => void;
}

export const CourseCreatePlacePicker = ({
  cities,
  dayNumber,
  selectedPlaces,
  onClose,
  onConfirm,
}: CourseCreatePlacePickerProps) => {
  const { showToast } = useToast();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<PlaceCategory>();
  const [draftPlaces, setDraftPlaces] = useState(selectedPlaces);
  const [focusedPlaceId, setFocusedPlaceId] = useState<string>();
  const [isResultSheetOpen, setIsResultSheetOpen] = useState(true);
  const placeResults = useCoursePlaceResults({
    cities,
    keyword,
    category,
    isSheetOpen: isResultSheetOpen,
  });
  const visiblePlaces = placeResults.places;
  const selectedPlaceIds = new Set(draftPlaces.map(({ placeId }) => placeId));
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      placeResults.hasNextPage &&
      !placeResults.isFetchingNextPage &&
      !placeResults.isFetchNextPageError,
    onIntersect: placeResults.loadMore,
  });

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setFocusedPlaceId(undefined);

    if (value.trim().length > 0 || category !== undefined) {
      setIsResultSheetOpen(true);
    }
  };

  const handleCategoryChange = (nextCategory: PlaceCategory) => {
    setCategory((currentCategory) =>
      currentCategory === nextCategory ? undefined : nextCategory,
    );
    setFocusedPlaceId(undefined);
    setIsResultSheetOpen(true);
  };

  const handleBookmarkClick = () => {
    if (placeResults.isSearchMode || !isResultSheetOpen) {
      setKeyword('');
      setCategory(undefined);
      setFocusedPlaceId(undefined);
      setIsResultSheetOpen(true);
      return;
    }

    setIsResultSheetOpen(false);
  };

  const handlePlaceSelect = (placeId: string) => {
    if (selectedPlaceIds.has(placeId)) {
      setDraftPlaces((currentPlaces) =>
        currentPlaces.filter((place) => place.placeId !== placeId),
      );
      setFocusedPlaceId(undefined);
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
    setFocusedPlaceId(placeId);
  };

  const handleConfirm = () => {
    onConfirm(draftPlaces);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 mx-auto max-w-107.5 overflow-hidden bg-white">
      <CourseCreatePlaceMap
        center={placeResults.searchCenter}
        places={visiblePlaces}
        selectedPlaceId={focusedPlaceId}
        onPlaceSelect={handlePlaceSelect}
      />

      <div className="absolute top-2 right-4 left-2 z-10 flex items-center">
        <button
          aria-label="장소 선택 닫기"
          className="flex size-11 shrink-0 items-center justify-center text-gray-800"
          type="button"
          onClick={onClose}
        >
          <ChevronLeftIcon aria-hidden className="size-6" />
        </button>
        <div className="min-w-0 flex-1 rounded-xl bg-white shadow-[0_2px_2px_rgba(0,0,0,0.2)] [&>div]:bg-white">
          <Searchbar
            aria-label="장소 검색"
            size="small"
            value={keyword}
            placeholder="검색어를 입력해주세요"
            onChange={handleKeywordChange}
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
          isResultSheetOpen ? 'bottom-[calc(57dvh+1rem)]' : 'bottom-4',
        )}
      >
        <IconButton
          aria-label={
            isResultSheetOpen && !placeResults.isSearchMode
              ? '최근 저장 목록 닫기'
              : '최근 저장 목록 열기'
          }
          aria-pressed={isResultSheetOpen && !placeResults.isSearchMode}
          className={cn(
            'text-mint-300 size-9 shadow-[0_2px_2px_rgba(0,0,0,0.2)]',
            isResultSheetOpen && !placeResults.isSearchMode
              ? 'bg-gray-100'
              : 'bg-white',
          )}
          icon={<BookmarkIcon />}
          iconClassName="size-5"
          onClick={handleBookmarkClick}
        />
      </div>

      <BottomSheet
        open={isResultSheetOpen}
        modal={false}
        ariaLabel={`Day ${dayNumber} ${placeResults.isSearchMode ? '장소 검색 결과' : '최근 저장 장소'}`}
        className="flex h-[57dvh] flex-col rounded-t-[20px]"
        handleClassName="h-1.5 w-14"
        onClose={() => setIsResultSheetOpen(false)}
      >
        <div className="flex min-h-0 flex-1 flex-col px-4">
          <div className="min-h-0 flex-1 scrollbar-none overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden">
            {placeResults.isLoading ? null : placeResults.isError ? (
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
            ) : placeResults.isAwaitingKeyword ? (
              <p className="text-body-r-14 py-16 text-center text-gray-500">
                검색어를 입력해주세요.
              </p>
            ) : visiblePlaces.length === 0 ? (
              <p className="text-body-r-14 py-16 text-center text-gray-500">
                {placeResults.isSearchMode
                  ? '검색 결과가 없어요.'
                  : '최근 저장한 장소가 없어요.'}
              </p>
            ) : (
              <>
                <ul className="divide-y divide-gray-50">
                  {visiblePlaces.map((place) => (
                    <li key={place.placeId} className="py-6 first:pt-0">
                      <CourseSelectCard
                        place={place}
                        isSelected={selectedPlaceIds.has(place.placeId)}
                        onSelect={handlePlaceSelect}
                      />
                    </li>
                  ))}
                </ul>
                <div ref={loadMoreRef} aria-hidden className="h-1" />
                {placeResults.isFetchNextPageError && (
                  <button
                    className="text-caption-m-12 text-mint-400 mx-auto block py-4"
                    type="button"
                    onClick={placeResults.loadMore}
                  >
                    다시 불러오기
                  </button>
                )}
              </>
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

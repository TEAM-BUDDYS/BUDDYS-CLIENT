'use client';

import type { Place } from '@/domains/course/api/type';
import { CourseSelectCard } from '@/domains/course/components/course-select-card/course-select-card';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

interface CourseCreatePlaceResultListProps {
  places: readonly Place[];
  selectedPlaceIds: ReadonlySet<string>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  isVisible: boolean;
  onLoadMore: () => void;
  onPlaceFocus: (placeId: string) => void;
  onSelect: (placeId: string) => void;
}

export const CourseCreatePlaceResultList = ({
  places,
  selectedPlaceIds,
  hasNextPage,
  isFetchingNextPage,
  isFetchNextPageError,
  isVisible,
  onLoadMore,
  onPlaceFocus,
  onSelect,
}: CourseCreatePlaceResultListProps) => {
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      isVisible && hasNextPage && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: onLoadMore,
  });

  return (
    <>
      <ul className="divide-y divide-gray-50">
        {places.map((place) => (
          <li key={place.placeId} className="py-6 first:pt-0">
            <CourseSelectCard
              place={place}
              isSelected={selectedPlaceIds.has(place.placeId)}
              onPlaceFocus={onPlaceFocus}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} aria-hidden className="h-1" />
      {isFetchNextPageError && (
        <button
          className="text-caption-m-12 text-mint-400 mx-auto block py-4"
          type="button"
          onClick={onLoadMore}
        >
          다시 불러오기
        </button>
      )}
    </>
  );
};

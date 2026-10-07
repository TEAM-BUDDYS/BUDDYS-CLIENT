'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { PLACE_QUERY_OPTIONS } from '@/domains/course/api/query';
import { LocationListItem } from '@/domains/profile/components/location-list-item/location-list-item';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const SAVED_PLACES_PAGE_SIZE = 20;

const SavedPlaceItems = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    PLACE_QUERY_OPTIONS.BOOKMARKS({ size: SAVED_PLACES_PAGE_SIZE }),
  );

  const places = data.pages.flatMap((page) => page.places);

  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  if (places.length === 0 && !hasNextPage) {
    return (
      <EmptyState
        title="장소 정보를 찾을 수 없어요"
        description="내 장소를 저장해 보세요"
        className="pt-25.25"
      />
    );
  }

  return (
    <>
      <ul className="-mx-4">
        {places.map((place) => (
          <li key={place.placeId}>
            <LocationListItem
              title={place.name}
              description={place.address ?? ''}
              href={place.googleMapsUrl}
            />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          장소를 불러오는 중이에요
        </p>
      )}
      {isFetchNextPageError && (
        <button
          type="button"
          className="text-caption-m-12 text-mint-400 mx-auto block py-4"
          onClick={() => fetchNextPage()}
        >
          다시 불러오기
        </button>
      )}
    </>
  );
};

export const SavedPlaceList = () => {
  return (
    <AsyncBoundary
      className="py-8"
      loadingFallback={<div className="min-h-96" aria-busy="true" />}
    >
      <SavedPlaceItems />
    </AsyncBoundary>
  );
};

import { CourseSaveCard } from '@/domains/course/components/course-save-card/course-save-card';
import type { NearbyCourseItem } from '@/domains/course/model/course-place';
import { AsyncErrorState, AsyncLoadingState } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

interface NearbyCourseContentProps {
  hasError?: boolean;
  hasLocationError?: boolean;
  hasNextPage?: boolean;
  isFetchNextPageError?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  isSearchMode?: boolean;
  items: readonly NearbyCourseItem[];
  pendingBookmarkPlaceIds?: ReadonlySet<string>;
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
  onLoadMore?: () => void;
  onRetry?: () => void;
}

export const NearbyCourseContent = ({
  hasError = false,
  hasLocationError = false,
  hasNextPage = false,
  isFetchNextPageError = false,
  isFetchingNextPage = false,
  isLoading = false,
  isSearchMode = false,
  items,
  pendingBookmarkPlaceIds,
  onBookmarkChange,
  onLoadMore,
  onRetry,
}: NearbyCourseContentProps) => {
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetchNextPageError &&
      Boolean(onLoadMore),
    onIntersect: () => onLoadMore?.(),
  });

  if (isLoading) {
    return (
      <AsyncLoadingState
        className="min-h-60"
        title={
          isSearchMode
            ? '장소를 검색하고 있어요'
            : '근처 장소를 불러오고 있어요'
        }
      />
    );
  }

  if ((hasLocationError || hasError) && onRetry) {
    return (
      <AsyncErrorState
        className="min-h-60"
        title={
          hasLocationError
            ? '현재 위치를 불러오지 못했어요'
            : isSearchMode
              ? '검색 결과를 불러오지 못했어요'
              : '근처 장소를 불러오지 못했어요'
        }
        description={
          hasLocationError
            ? '위치 권한을 확인한 뒤 다시 시도해 주세요.'
            : undefined
        }
        retryLabel={hasLocationError ? '위치 다시 불러오기' : undefined}
        onRetry={onRetry}
      />
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-body-m-15 py-22.5 text-center text-gray-500">
        {isSearchMode ? '검색 결과가 없어요' : '주변에 표시할 장소가 없어요'}
      </p>
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-6 divide-y-1 divide-gray-50">
        {items.map(({ place, description }) => (
          <li key={place.placeId} className="pb-6">
            <CourseSaveCard
              place={place}
              description={description}
              isBookmarkPending={pendingBookmarkPlaceIds?.has(place.placeId)}
              onBookmarkChange={onBookmarkChange}
            />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} aria-hidden className="h-1" />
      {isFetchingNextPage ? (
        <p
          role="status"
          className="text-caption-m-12 py-4 text-center text-gray-500"
        >
          장소를 불러오는 중이에요
        </p>
      ) : null}
      {isFetchNextPageError && onLoadMore ? (
        <button
          className="text-caption-m-12 text-mint-400 mx-auto block py-4"
          type="button"
          onClick={onLoadMore}
        >
          다시 불러오기
        </button>
      ) : null}
    </>
  );
};

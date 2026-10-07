'use client';

import type { NearbyCourseItem } from '@/domains/course/model/course-place';
import { AsyncErrorState, AsyncLoadingState } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

import { NearbyCourseContent } from './nearby-course-content';

interface BookmarkedPlaceContentProps {
  hasError?: boolean;
  hasNextPage?: boolean;
  isFetchNextPageError?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  items: readonly NearbyCourseItem[];
  pendingBookmarkPlaceIds?: ReadonlySet<string>;
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
  onLoadMore?: () => void;
  onRetry?: () => void;
}

export const BookmarkedPlaceContent = ({
  hasError = false,
  hasNextPage = false,
  isFetchNextPageError = false,
  isFetchingNextPage = false,
  isLoading = false,
  items,
  pendingBookmarkPlaceIds,
  onBookmarkChange,
  onLoadMore,
  onRetry,
}: BookmarkedPlaceContentProps) => {
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
        title="저장한 장소를 불러오고 있어요"
      />
    );
  }

  if (hasError && onRetry) {
    return (
      <AsyncErrorState
        className="min-h-60"
        title="저장한 장소를 불러오지 못했어요"
        onRetry={onRetry}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-full justify-center pt-22.5 text-center">
        <p className="text-body-m-15 whitespace-pre-line text-gray-500">
          {'주변에 저장한 장소가 없어요\n장소를 찾아 북마크해보세요'}
        </p>
      </div>
    );
  }

  return (
    <>
      <NearbyCourseContent
        items={items}
        pendingBookmarkPlaceIds={pendingBookmarkPlaceIds}
        onBookmarkChange={onBookmarkChange}
      />
      <div ref={loadMoreRef} aria-hidden className="h-1" />
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

import { CourseSaveCard } from '@/domains/course/components/course-save-card/course-save-card';
import type { NearbyCourseItem } from '@/domains/course/model/course-place';
import { AsyncErrorState, AsyncLoadingState } from '@/shared/components/ui';

interface NearbyCourseContentProps {
  hasError?: boolean;
  hasLocationError?: boolean;
  isLoading?: boolean;
  items: readonly NearbyCourseItem[];
  pendingBookmarkPlaceIds?: ReadonlySet<string>;
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
  onRetry?: () => void;
}

export const NearbyCourseContent = ({
  hasError = false,
  hasLocationError = false,
  isLoading = false,
  items,
  pendingBookmarkPlaceIds,
  onBookmarkChange,
  onRetry,
}: NearbyCourseContentProps) => {
  if (isLoading) {
    return (
      <AsyncLoadingState
        className="min-h-60"
        title="근처 장소를 불러오고 있어요"
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
        주변에 표시할 장소가 없어요
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 divide-y-1 divide-gray-50">
      {items.map(({ place, description }) => (
        <div key={place.placeId} className="pb-6">
          <CourseSaveCard
            place={place}
            description={description}
            isBookmarkPending={pendingBookmarkPlaceIds?.has(place.placeId)}
            onBookmarkChange={onBookmarkChange}
          />
        </div>
      ))}
    </div>
  );
};

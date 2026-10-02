import type { Place } from '@/domains/course/api/type';
import { CourseSaveCard } from '@/domains/course/components/course-save-card/course-save-card';
import { AsyncErrorState, AsyncLoadingState } from '@/shared/components/ui';

export interface NearbyCourseItem {
  place: Place;
  description: string;
}

interface NearbyCourseContentProps {
  hasError?: boolean;
  isLoading?: boolean;
  items: readonly NearbyCourseItem[];
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
  onRetry?: () => void;
}

export const NearbyCourseContent = ({
  hasError = false,
  isLoading = false,
  items,
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

  if (hasError && onRetry) {
    return (
      <AsyncErrorState
        className="min-h-60"
        title="근처 장소를 불러오지 못했어요"
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
            onBookmarkChange={onBookmarkChange}
          />
        </div>
      ))}
    </div>
  );
};

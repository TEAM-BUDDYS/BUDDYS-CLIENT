'use client';

import type { Place } from '@/domains/course/api/type';
import { CoursePlaceImage } from '@/domains/course/components/course-place-image/course-place-image';
import { BookmarkButton } from '@/shared/components/ui';

interface CourseSaveCardProps {
  place: Place;
  description: string;
  isBookmarkPending?: boolean;
  onPlaceSelect: (place: Place) => void;
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
}

export const CourseSaveCard = ({
  place,
  description,
  isBookmarkPending = false,
  onPlaceSelect,
  onBookmarkChange,
}: CourseSaveCardProps) => {
  const { placeId, name, address, bookmarked, photoUrl } = place;
  const displayName = name ?? '이름 없는 장소';

  const handleBookmarkClick = () => {
    onBookmarkChange(placeId, !bookmarked);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-label={`${displayName} 지도에서 보기`}
        className="focus-visible:outline-mint-300 flex w-full items-center gap-4 rounded-xl pr-14 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={() => onPlaceSelect(place)}
      >
        <CoursePlaceImage photoUrl={photoUrl} />

        <span className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="text-body-sb-16 truncate text-gray-800">
            {displayName}
          </span>
          <span className="flex min-w-0 flex-col gap-1">
            <span className="text-caption-m-12 truncate text-gray-500">
              {address ?? '주소 정보 없음'}
            </span>
            <span className="text-caption-m-12 truncate text-gray-200">
              {description}
            </span>
          </span>
        </span>
      </button>

      <BookmarkButton
        isBookmarked={bookmarked}
        aria-busy={isBookmarkPending}
        aria-label={
          bookmarked ? `${displayName} 저장 해제` : `${displayName} 저장`
        }
        className="absolute top-1/2 right-0 size-6 -translate-y-1/2 rounded-sm"
        disabled={isBookmarkPending}
        onClick={handleBookmarkClick}
      />
    </div>
  );
};

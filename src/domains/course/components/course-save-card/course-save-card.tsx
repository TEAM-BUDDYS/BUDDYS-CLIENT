'use client';

import type { Place } from '@/domains/course/api/type';
import { BookmarkButton, CommonImage } from '@/shared/components/ui';

interface CourseSaveCardProps {
  place: Place;
  // TODO: 서버와 description 스키마 논의가 완료되면 Place 필드로 대체
  description: string;
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
}

export const CourseSaveCard = ({
  place,
  description,
  onBookmarkChange,
}: CourseSaveCardProps) => {
  const { placeId, name, address, bookmarked, photoUrl } = place;
  const displayName = name ?? '이름 없는 장소';

  const handleBookmarkClick = () => {
    onBookmarkChange(placeId, !bookmarked);
  };

  return (
    <article className="flex w-full items-center gap-4">
      {photoUrl && (
        <CommonImage
          src={photoUrl}
          alt={`${displayName} 이미지`}
          width={100}
          height={100}
          radius="rounded-xl"
          className="size-25"
        />
      )}

      <div className="flex min-w-0 flex-1 items-center gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3 className="text-body-sb-16 truncate text-gray-800">
            {displayName}
          </h3>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-caption-m-12 truncate text-gray-500">
              {address ?? '주소 정보 없음'}
            </p>
            <p className="text-caption-m-12 truncate text-gray-200">
              {description}
            </p>
          </div>
        </div>

        <BookmarkButton
          isBookmarked={bookmarked}
          aria-label={
            bookmarked ? `${displayName} 저장 해제` : `${displayName} 저장`
          }
          className="size-6 rounded-sm"
          onClick={handleBookmarkClick}
        />
      </div>
    </article>
  );
};

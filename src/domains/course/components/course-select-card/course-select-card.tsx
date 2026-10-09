'use client';

import { useId, useState } from 'react';

import type { BookmarkedPlace, Place } from '@/domains/course/api/type';
import { cn } from '@/lib/cn';
import { getApiResourceUrl } from '@/shared/api';
import { ChipButton, CommonImage } from '@/shared/components/ui';

interface CourseSelectCardProps {
  place: Place | BookmarkedPlace;
  isSelected: boolean;
  onPlaceFocus: (placeId: string) => void;
  onSelect: (placeId: string) => void;
}

export const CourseSelectCard = ({
  place,
  isSelected,
  onPlaceFocus,
  onSelect,
}: CourseSelectCardProps) => {
  const headingId = useId();
  const focusActionId = `${headingId}-focus-action`;
  const [failedPhotoUrl, setFailedPhotoUrl] = useState<string>();
  const { placeId, name, address, photoUrl } = place;
  const imageUrl = photoUrl ? getApiResourceUrl(photoUrl) : null;
  const hasImageError = failedPhotoUrl === imageUrl;
  const displayName = name ?? '이름 없는 장소';
  const location =
    'country' in place
      ? [place.country, place.city].filter(Boolean).join(' · ')
      : null;

  return (
    <article className="flex w-full items-center gap-4">
      <div className="relative flex min-w-0 flex-1 items-center gap-4">
        <button
          aria-labelledby={`${headingId} ${focusActionId}`}
          className="focus-visible:outline-mint-300 absolute inset-0 z-10 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
          type="button"
          onClick={() => onPlaceFocus(placeId)}
        >
          <span id={focusActionId} className="sr-only">
            지도에서 보기
          </span>
        </button>

        {imageUrl && !hasImageError ? (
          <CommonImage
            unoptimized
            src={imageUrl}
            alt=""
            width={100}
            height={100}
            radius="rounded-xl"
            className="size-25 shrink-0"
            onError={() => setFailedPhotoUrl(imageUrl)}
          />
        ) : (
          <div aria-hidden className="size-25 shrink-0 rounded-xl bg-gray-50" />
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 id={headingId} className="text-body-sb-16 truncate text-gray-800">
            {displayName}
          </h3>
          <div className="text-caption-m-12 flex min-w-0 flex-col gap-0.5 text-gray-500">
            {location && <p className="truncate">{location}</p>}
            <p className="truncate">{address ?? '주소 정보 없음'}</p>
          </div>
        </div>
      </div>

      <ChipButton
        active={isSelected}
        aria-label={`${displayName} ${isSelected ? '선택 해제' : '선택'}`}
        className={cn(
          'focus-visible:outline-mint-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
          !isSelected && 'border-gray-100',
        )}
        onClick={() => onSelect(placeId)}
      >
        선택
      </ChipButton>
    </article>
  );
};

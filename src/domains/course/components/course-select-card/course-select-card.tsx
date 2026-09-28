'use client';

import { useState } from 'react';

import type { BookmarkedPlace, Place } from '@/domains/course/api/type';
import { cn } from '@/lib/cn';
import { ChipButton, CommonImage } from '@/shared/components/ui';

interface CourseSelectCardProps {
  place: Place | BookmarkedPlace;
  isSelected: boolean;
  onSelect: (placeId: string) => void;
}

export const CourseSelectCard = ({
  place,
  isSelected,
  onSelect,
}: CourseSelectCardProps) => {
  const [failedPhotoUrl, setFailedPhotoUrl] = useState<string>();
  const { placeId, name, address, photoUrl } = place;
  const hasImageError = failedPhotoUrl === photoUrl;
  const displayName = name ?? '이름 없는 장소';
  const location =
    'country' in place
      ? [place.country, place.city].filter(Boolean).join(' · ')
      : null;

  return (
    <article className="flex w-full items-center gap-4">
      {photoUrl && !hasImageError ? (
        <CommonImage
          unoptimized
          src={photoUrl}
          alt={`${displayName} 이미지`}
          width={100}
          height={100}
          radius="rounded-xl"
          className="size-25"
          onError={() => setFailedPhotoUrl(photoUrl)}
        />
      ) : (
        <div aria-hidden className="size-25 shrink-0 rounded-xl bg-gray-50" />
      )}

      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="text-body-sb-16 truncate text-gray-800">
            {displayName}
          </h3>
          <div className="text-caption-m-12 flex min-w-0 flex-col gap-0.5 text-gray-500">
            {location && <p className="truncate">{location}</p>}
            <p className="truncate">{address ?? '주소 정보 없음'}</p>
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
      </div>
    </article>
  );
};

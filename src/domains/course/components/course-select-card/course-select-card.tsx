'use client';

import type { Place } from '@/domains/course/api/type';
import { cn } from '@/lib/cn';
import { ChipButton, CommonImage } from '@/shared/components/ui';

interface CourseSelectCardProps {
  place: Place;
  // TODO: 서버와 description 스키마 논의가 완료되면 Place 필드로 대체
  description: string;
  isSelected: boolean;
  onSelect: (placeId: string) => void;
}

export const CourseSelectCard = ({
  place,
  description,
  isSelected,
  onSelect,
}: CourseSelectCardProps) => {
  const { placeId, name, address, photoUrl } = place;
  const displayName = name ?? '이름 없는 장소';

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

      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="text-body-sb-16 truncate text-gray-800">
            {displayName}
          </h3>
          <div className="text-caption-m-12 flex min-w-0 flex-col gap-0.5 text-gray-500">
            <p className="truncate">{address ?? '주소 정보 없음'}</p>
            <p className="truncate">{description}</p>
          </div>
        </div>

        <ChipButton
          active={isSelected}
          aria-label={`${displayName} 선택`}
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

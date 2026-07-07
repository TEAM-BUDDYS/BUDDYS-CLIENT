import Link from 'next/link';

import { Tag } from '@/shared/components/ui/card/card-tag';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface CardProfileProps {
  nickname: string;
  country: string;
  ageGroup: string;
  matchingRate: number;
  imageUrl: string;
  href: string;
}

export const CardProfile = ({
  nickname,
  country,
  ageGroup,
  matchingRate,
  imageUrl,
  href,
}: CardProfileProps) => {
  return (
    <article>
      <Link
        href={href}
        className="flex h-42 w-35.25 flex-col items-center justify-between gap-2 rounded-2xl border border-gray-200 px-10 py-4"
      >
        <CommonImage
          src={imageUrl}
          alt={`${nickname} 프로필 이미지`}
          width={60}
          height={60}
          unoptimized
          radius="rounded-full"
        />
        <div className="flex w-full flex-col items-center">
          <span className="text-body-sb-15 w-30 text-center text-gray-800">
            {nickname}
          </span>
          <span className="text-caption-m-10 text-gray-500">
            {country} · {ageGroup}
          </span>
        </div>
        <Tag value={`매칭 ${matchingRate}%`} />
      </Link>
    </article>
  );
};

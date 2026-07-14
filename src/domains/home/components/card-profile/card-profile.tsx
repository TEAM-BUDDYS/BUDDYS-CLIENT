import Link from 'next/link';

import { defaultProfileImage } from '@/shared/assets/illustrations';
import { Tag } from '@/shared/components/ui/card/card-tag';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';
import { ROUTES } from '@/shared/config';

interface CardProfileProps {
  userId: number;
  nickname: string;
  countryName: string;
  ageRange: string;
  matchingPercentage: number;
  profileImageUrl?: string;
}

export const CardProfile = ({
  userId,
  nickname,
  countryName,
  ageRange,
  matchingPercentage,
  profileImageUrl,
}: CardProfileProps) => {
  const profileDescription = `${countryName} · ${ageRange}`;

  return (
    <article>
      <Link
        href={ROUTES.PROFILE.DETAIL(userId)}
        className="flex h-42 w-35.25 flex-col items-center justify-between gap-2 rounded-2xl border border-gray-200 px-10 py-4"
      >
        <CommonImage
          src={profileImageUrl || defaultProfileImage.src}
          alt={`${nickname} 프로필 이미지`}
          width={60}
          height={60}
          unoptimized
          radius="rounded-full"
          onError={(event) => {
            event.currentTarget.src = defaultProfileImage.src;
          }}
        />
        <div className="flex w-full flex-col items-center">
          <span className="text-body-sb-15 w-30 text-center text-gray-800">
            {nickname}
          </span>
          <span className="text-caption-m-10 text-gray-500">
            {profileDescription}
          </span>
        </div>
        <Tag value={`매칭 ${matchingPercentage}%`} />
      </Link>
    </article>
  );
};

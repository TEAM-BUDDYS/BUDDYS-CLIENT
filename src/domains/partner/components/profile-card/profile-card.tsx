import Link from 'next/link';

import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';
import { ROUTES } from '@/shared/config';

interface ProfileCardProps {
  userId: number;
  nickname: string;
  countryName: string;
  ageRange: string;
  matchingPercentage: number;
  profileImageUrl?: string;
}

export const ProfileCard = ({
  userId,
  nickname,
  countryName,
  ageRange,
  matchingPercentage,
  profileImageUrl,
}: ProfileCardProps) => {
  const profileDescription = `${countryName} · ${ageRange}`;

  return (
    <article>
      <Link
        href={ROUTES.PROFILE.DETAIL(userId)}
        className="flex w-35 flex-col items-center gap-2 rounded-2xl border border-gray-200 px-10 py-4"
      >
        <CommonImage
          src={profileImageUrl || defaultProfileImage.src}
          alt={`${nickname} 프로필 이미지`}
          width={60}
          height={60}
          radius="rounded-full"
          className="size-15 border border-gray-100"
          onError={(event) => {
            event.currentTarget.srcset = '';
            event.currentTarget.src = defaultProfileImage.src;
          }}
        />
        <div className="flex w-full flex-col items-center">
          <h3 className="text-body-sb-15 w-30 text-center text-gray-800">
            {nickname}
          </h3>
          <p className="text-caption-m-10 text-gray-500">
            {profileDescription}
          </p>
        </div>
        <span className="text-caption-m-10 inline-flex w-fit rounded bg-gray-800 px-2 py-0.75 whitespace-nowrap text-white">
          매칭 {matchingPercentage}%
        </span>
      </Link>
    </article>
  );
};

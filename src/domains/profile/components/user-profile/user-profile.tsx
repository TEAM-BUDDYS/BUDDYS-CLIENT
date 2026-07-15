import { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui';

interface UserProfileProps {
  imageUrl?: string | null;
  nickname: string;
  badgeIcon?: ReactNode;
  badgeLabel?: string;
  className?: string;
}

export const UserProfile = ({
  imageUrl,
  nickname,
  badgeIcon,
  badgeLabel,
  className,
}: UserProfileProps) => {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <CommonImage
        src={imageUrl ?? defaultProfileImage.src}
        alt={`${nickname}님의 프로필 이미지`}
        width={120}
        height={120}
        radius="rounded-full"
        className="mb-3 aspect-square h-auto w-full max-w-30"
      />
      <div className="flex items-center gap-1">
        <span className="text-title-b-18 text-gray-800">{nickname}</span>
        {badgeIcon && (
          <span
            aria-hidden={badgeLabel ? undefined : true}
            aria-label={badgeLabel}
            className="flex h-5 w-5 shrink-0 items-center justify-center"
            role={badgeLabel ? 'img' : undefined}
          >
            {badgeIcon}
          </span>
        )}
      </div>
    </div>
  );
};

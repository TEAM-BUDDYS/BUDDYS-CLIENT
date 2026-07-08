import { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { CommonImage } from '@/shared/components/ui';

const IMAGE_SIZE = 110;

interface UserProfileProps {
  imageUrl: string;
  nickname: string;
  badgeIcon?: ReactNode;
  className?: string;
}

export const UserProfile = ({
  imageUrl,
  nickname,
  badgeIcon,
  className,
}: UserProfileProps) => {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <CommonImage
        src={imageUrl}
        alt={`${nickname}님의 프로필 이미지`}
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        radius="rounded-full"
        className="mb-3"
      />
      <div className="flex items-center gap-2">
        <span className="text-title-b-18">{nickname}</span>
        {badgeIcon && (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            {badgeIcon}
          </span>
        )}
      </div>
    </div>
  );
};

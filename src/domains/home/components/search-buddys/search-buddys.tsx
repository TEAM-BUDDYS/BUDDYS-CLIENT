'use client';

import { cn } from '@/lib/cn';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { ChatIcon } from '@/shared/components/icons';
import { CommonImage, IconButton } from '@/shared/components/ui';

interface SearchBuddysProps {
  nickname: string;
  profileImageUrl?: string | null;
  onChatClick: () => void;
  className?: string;
}

export const SearchBuddys = ({
  nickname,
  profileImageUrl,
  onChatClick,
  className,
}: SearchBuddysProps) => {
  return (
    <div
      className={cn(
        'flex w-full items-center border-b border-gray-100 pb-3.5 last:border-b-0 last:pb-0',
        className,
      )}
    >
      <CommonImage
        src={profileImageUrl || defaultProfileImage.src}
        alt={`${nickname}님의 프로필 이미지`}
        width={50}
        height={50}
        radius="rounded-full"
        className="size-12.5 shrink-0 border border-gray-100"
      />
      <span className="text-body-sb-15 ml-3.25 min-w-0 truncate text-gray-800">
        {nickname}
      </span>
      <IconButton
        variant="primary"
        icon={<ChatIcon />}
        aria-label={`${nickname}님과 채팅하기`}
        className="ml-auto shrink-0"
        onClick={onChatClick}
      />
    </div>
  );
};

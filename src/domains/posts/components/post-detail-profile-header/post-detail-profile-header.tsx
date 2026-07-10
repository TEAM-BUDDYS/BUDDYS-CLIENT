'use client';

import { useState } from 'react';

import { PostRecruitmentStatusBottomSheet } from '@/domains/posts/components/post-recruitment-status-bottom-sheet/post-recruitment-status-bottom-sheet';
import { PostRecruitmentStatusButton } from '@/domains/posts/components/post-recruitment-status-button/post-recruitment-status-button';
import type { PostRecruitmentStatusTypes } from '@/domains/posts/model/post-recruitment-status';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { Tag } from '@/shared/components/ui/card/card-tag';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface PostDetailProfileHeaderProps {
  nickname: string;
  country: string;
  profileDescription: string;
  profileImageUrl?: string;
  recruitmentStatus?: PostRecruitmentStatusTypes;
}

export const PostDetailProfileHeader = ({
  nickname,
  country,
  profileDescription,
  profileImageUrl,
  recruitmentStatus = 'RECRUITING',
}: PostDetailProfileHeaderProps) => {
  const profileImageSrc = profileImageUrl ?? defaultProfileImage;
  const [selectedRecruitmentStatus, setSelectedRecruitmentStatus] =
    useState(recruitmentStatus);
  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);

  const handleStatusButtonClick = () => {
    setIsStatusBottomSheetOpen(true);
  };

  const handleStatusBottomSheetClose = () => {
    setIsStatusBottomSheetOpen(false);
  };

  return (
    <header className="flex w-full items-center justify-between">
      <div className="flex min-w-0 items-center gap-2">
        <CommonImage
          src={profileImageSrc}
          alt={`${nickname} 프로필 이미지`}
          width={44}
          height={44}
          unoptimized={Boolean(profileImageUrl)}
          radius="rounded-full"
        />

        <div className="flex min-w-0 flex-col">
          <div className="flex min-w-0 items-center gap-1">
            <strong className="text-body-sb-16 truncate text-gray-800">
              {nickname}
            </strong>
            <Tag value={country} />
          </div>
          <span className="text-body-r-14 truncate text-gray-500">
            {profileDescription}
          </span>
        </div>
      </div>

      <PostRecruitmentStatusButton
        aria-expanded={isStatusBottomSheetOpen}
        aria-haspopup="dialog"
        className="shrink-0"
        status={selectedRecruitmentStatus}
        onClick={handleStatusButtonClick}
      />
      <PostRecruitmentStatusBottomSheet
        open={isStatusBottomSheetOpen}
        value={selectedRecruitmentStatus}
        onClose={handleStatusBottomSheetClose}
        onSelect={setSelectedRecruitmentStatus}
      />
    </header>
  );
};

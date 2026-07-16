'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { POST_MUTATION_OPTIONS } from '@/domains/posts/api/query';
import { PostRecruitmentStatusBottomSheet } from '@/domains/posts/components/post-recruitment-status-bottom-sheet/post-recruitment-status-bottom-sheet';
import { PostRecruitmentStatusButton } from '@/domains/posts/components/post-recruitment-status-button/post-recruitment-status-button';
import type { PostRecruitmentStatusTypes } from '@/domains/posts/model/post-recruitment-status';
import { cn } from '@/lib/cn';
import { POST_QUERY_KEY, RECOMMENDATION_QUERY_KEY } from '@/shared/api';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { BookmarkIcon } from '@/shared/components/icons';
import { useToast } from '@/shared/components/ui';
import { CommonImage } from '@/shared/components/ui/common-image/common-image';

interface PostDetailProfileHeaderProps {
  postId: number;
  nickname: string;
  profileDescription: string;
  profileImageUrl?: string;
  recruitmentStatus?: PostRecruitmentStatusTypes;
  isMine: boolean;
}

export const PostDetailProfileHeader = ({
  postId,
  nickname,
  profileDescription,
  profileImageUrl,
  recruitmentStatus = 'RECRUITING',
  isMine,
}: PostDetailProfileHeaderProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const profileImageSrc = profileImageUrl ?? defaultProfileImage;
  const [selectedRecruitmentStatus, setSelectedRecruitmentStatus] =
    useState(recruitmentStatus);
  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const updateStatusMutation = useMutation({
    ...POST_MUTATION_OPTIONS.UPDATE_STATUS(),
    onSuccess: ({ status }) => {
      setSelectedRecruitmentStatus(status);
      showToast('모집 상태가 변경되었어요', {
        bottomOffsetClassName: 'bottom-26.5',
      });

      void Promise.all([
        queryClient.invalidateQueries({
          queryKey: POST_QUERY_KEY.DETAIL(postId),
        }),
        queryClient.invalidateQueries({
          queryKey: RECOMMENDATION_QUERY_KEY.POSTS_ALL(),
        }),
      ]);
    },
    onError: () => {
      showToast('모집 상태를 변경하지 못했어요. 다시 시도해 주세요.', {
        bottomOffsetClassName: 'bottom-26.5',
        variant: 'gray',
      });
    },
  });

  const handleStatusButtonClick = () => {
    setIsStatusBottomSheetOpen(true);
  };

  const handleStatusBottomSheetClose = () => {
    setIsStatusBottomSheetOpen(false);
  };

  const handleRecruitmentStatusSelect = (
    status: PostRecruitmentStatusTypes,
  ) => {
    if (
      status === selectedRecruitmentStatus ||
      updateStatusMutation.isPending
    ) {
      return;
    }

    updateStatusMutation.mutate({
      postId,
      body: { status },
    });
  };

  const handleBookmarkClick = () => {
    setIsBookmarked((currentIsBookmarked) => !currentIsBookmarked);
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
          <strong className="text-body-sb-16 truncate text-gray-800">
            {nickname}
          </strong>
          <span className="text-body-r-14 truncate text-gray-500">
            {profileDescription}
          </span>
        </div>
      </div>

      {isMine ? (
        <>
          <PostRecruitmentStatusButton
            aria-busy={updateStatusMutation.isPending}
            aria-expanded={isStatusBottomSheetOpen}
            aria-haspopup="dialog"
            className="shrink-0"
            disabled={updateStatusMutation.isPending}
            status={selectedRecruitmentStatus}
            onClick={handleStatusButtonClick}
          />
          <PostRecruitmentStatusBottomSheet
            open={isStatusBottomSheetOpen}
            value={selectedRecruitmentStatus}
            onClose={handleStatusBottomSheetClose}
            onSelect={handleRecruitmentStatusSelect}
          />
        </>
      ) : (
        <button
          aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
          aria-pressed={isBookmarked}
          className={cn(
            'flex size-12 shrink-0 items-center justify-center',
            isBookmarked ? 'text-mint-300' : 'text-gray-500',
          )}
          type="button"
          onClick={handleBookmarkClick}
        >
          <BookmarkIcon
            className={cn('size-6', isBookmarked && 'fill-current')}
          />
        </button>
      )}
    </header>
  );
};

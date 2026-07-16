'use client';

import * as Sentry from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { CHAT_MUTATION_OPTIONS } from '@/domains/chat/api/query';
import { ProfileBadgeIcon } from '@/shared/components/icons';
import { Header } from '@/shared/components/layout';
import { useToast } from '@/shared/components/ui';
import { ComingSoonModal } from '@/shared/components/ui/modal/coming-soon-modal/coming-soon-modal';
import { ROUTES } from '@/shared/config';

import type { OtherProfile } from '../../model/profile';
import { OtherContentSection } from '../../sections/other-content-section';
import { ProfileIntroSection } from '../../sections/profile-intro-section';
import { TagChipGroup } from '../tag-chip-group/tag-chip-group';
import { UserProfile } from '../user-profile/user-profile';

interface OtherProfilePageViewProps {
  userId: number;
  profile: OtherProfile;
}

export const OtherProfilePageView = ({
  userId,
  profile,
}: OtherProfilePageViewProps) => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const createChatRoomMutation = useMutation(CHAT_MUTATION_OPTIONS.CREATE());

  const handleChatClick = () => {
    createChatRoomMutation.mutate(
      {
        participantUserId: userId,
      },
      {
        onSuccess: (response) => {
          const chatRoomId = response.data?.chatRoomId;

          if (!chatRoomId) {
            const error = new Error('채팅방 생성 응답이 올바르지 않습니다.');

            Sentry.captureException(error);

            showToast('채팅방을 시작하지 못했어요. 다시 시도해 주세요.', {
              variant: 'gray',
            });

            return;
          }

          router.push(ROUTES.CHAT.DETAIL(chatRoomId));
        },
        onError: (error) => {
          Sentry.captureException(error);

          showToast('채팅방을 시작하지 못했어요. 다시 시도해 주세요.', {
            variant: 'gray',
          });
        },
      },
    );
  };

  const handleCourseTabClick = () => {
    setIsComingSoonOpen(true);
  };

  const handleModalClose = () => setIsComingSoonOpen(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header hasBackButton content={profile.nickname} />

      <main className="flex flex-1 flex-col items-center overflow-y-auto pt-9 pb-9">
        <UserProfile
          imageUrl={profile.imageUrl}
          nickname={profile.nickname}
          badgeIcon={
            profile.isVerified ? (
              <ProfileBadgeIcon className="size-6" />
            ) : undefined
          }
          badgeLabel={profile.isVerified ? '인증된 사용자' : undefined}
          className="px-4"
        />

        <TagChipGroup
          tags={profile.tags}
          minVisibleCount={3}
          className="mt-5.5 px-4"
        />

        {profile.isWithdrawn ? (
          <ProfileIntroSection
            viewerType="withdrawn"
            bio={profile.bio}
            className="mt-5.25 px-4"
          />
        ) : (
          <ProfileIntroSection
            viewerType="other"
            bio={profile.bio}
            onChatClick={handleChatClick}
            isChatPending={createChatRoomMutation.isPending}
            className="mt-5.25 px-4"
          />
        )}

        {!profile.isWithdrawn && (
          <OtherContentSection
            userId={userId}
            onCourseTabClick={handleCourseTabClick}
            className="mt-3"
          />
        )}
      </main>

      <ComingSoonModal open={isComingSoonOpen} onClose={handleModalClose} />
    </div>
  );
};

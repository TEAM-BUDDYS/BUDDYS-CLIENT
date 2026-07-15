'use client';

import * as Sentry from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ChatIcon } from '@/shared/components/icons';
import { IconButton, useToast } from '@/shared/components/ui';

import { CHAT_MUTATION_OPTIONS } from '../../api/query';

interface StartChatButtonProps {
  participantUserId: number;
}

export const StartChatButton = ({
  participantUserId,
}: StartChatButtonProps) => {
  const router = useRouter();
  const { showToast } = useToast();

  const createChatRoomMutation = useMutation(CHAT_MUTATION_OPTIONS.CREATE());

  const handleChatClick = () => {
    createChatRoomMutation.mutate(
      {
        participantUserId,
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

          router.push(`/chat/${chatRoomId}`);
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

  return (
    <IconButton
      className="pointer-events-auto px-2.5 py-2"
      disabled={createChatRoomMutation.isPending}
      icon={<ChatIcon />}
      variant="primary"
      onClick={handleChatClick}
    >
      {createChatRoomMutation.isPending ? '연결 중...' : '채팅하기'}
    </IconButton>
  );
};

'use client';

import * as Sentry from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { CHAT_MUTATION_OPTIONS } from '../api/query';

const START_CHAT_ERROR_MESSAGE =
  '채팅방을 시작하지 못했어요. 다시 시도해 주세요.';

export const useStartChat = () => {
  const router = useRouter();
  const { showToast } = useToast();

  const createChatRoomMutation = useMutation(CHAT_MUTATION_OPTIONS.CREATE());

  const showStartChatError = (error: unknown) => {
    Sentry.captureException(error);

    showToast(START_CHAT_ERROR_MESSAGE, {
      variant: 'gray',
    });
  };

  const startChat = (participantUserId: number) => {
    if (createChatRoomMutation.isPending) {
      return;
    }

    createChatRoomMutation.mutate(
      {
        participantUserId,
      },
      {
        onSuccess: (response) => {
          const chatRoomId = response.data?.chatRoomId;

          if (!chatRoomId) {
            showStartChatError(
              new Error('채팅방 생성 응답이 올바르지 않습니다.'),
            );

            return;
          }

          router.push(ROUTES.CHAT.DETAIL(chatRoomId));
        },
        onError: showStartChatError,
      },
    );
  };

  return {
    startChat,
    isPending: createChatRoomMutation.isPending,
  };
};

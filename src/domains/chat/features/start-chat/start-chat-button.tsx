'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ChatIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';

import { CHAT_MUTATION_OPTIONS } from '../../api/query';

interface StartChatButtonProps {
  participantUserId: number;
}

export const StartChatButton = ({
  participantUserId,
}: StartChatButtonProps) => {
  const router = useRouter();

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
            console.error('채팅방 ID가 응답에 없습니다.');
            return;
          }

          router.push(`/chat/${chatRoomId}`);
        },
        onError: (error) => {
          console.error('채팅방 생성에 실패했습니다.', error);
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

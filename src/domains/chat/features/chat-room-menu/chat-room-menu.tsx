'use client';

import * as Sentry from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { MoreIcon } from '@/shared/components/icons';
import { useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { CHAT_MUTATION_OPTIONS } from '../../api/query';
import {
  BottomSheetChat,
  ChatBottomSheetAction,
} from '../../components/bottom-sheet-chat/bottom-sheet-chat';

interface ChatRoomMenuProps {
  chatRoomId: number;
}

export const ChatRoomMenu = ({ chatRoomId }: ChatRoomMenuProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const reportMutation = useMutation(CHAT_MUTATION_OPTIONS.REPORT());
  const blockMutation = useMutation(CHAT_MUTATION_OPTIONS.BLOCK());
  const { showToast } = useToast();

  const handleAction = async (action: ChatBottomSheetAction) => {
    if (action !== 'block' && action !== 'report') {
      return;
    }

    try {
      if (action === 'block') {
        await blockMutation.mutateAsync(chatRoomId);
      } else {
        await reportMutation.mutateAsync({ chatRoomId });
      }

      // 성공했을 때만 이동
      router.replace(ROUTES.CHAT.ROOT);
    } catch (error) {
      Sentry.captureException(error);

      showToast(
        action === 'block'
          ? '차단하지 못했어요. 다시 시도해 주세요.'
          : '신고하지 못했어요. 다시 시도해 주세요.',
        { variant: 'gray' },
      );
    }
  };

  return (
    <>
      <button
        className="-mr-2 p-2.5"
        type="button"
        aria-label="채팅방 메뉴 열기"
        onClick={() => setOpen(true)}
      >
        <MoreIcon width={24} height={24} />
      </button>

      <BottomSheetChat
        open={open}
        onClose={() => setOpen(false)}
        onAction={handleAction}
      />
    </>
  );
};

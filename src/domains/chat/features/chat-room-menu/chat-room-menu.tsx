'use client';

import * as Sentry from '@sentry/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { CHAT_ROOM_QUERY_KEY } from '@/shared/api';
import { MoreIcon } from '@/shared/components/icons';
import { AsyncLoadingState, useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { CHAT_MUTATION_OPTIONS } from '../../api/query';
import {
  BottomSheetChat,
  ChatBottomSheetAction,
} from '../../components/bottom-sheet-chat/bottom-sheet-chat';

interface ChatRoomMenuProps {
  chatRoomId: number;
  hasBlocked: boolean;
  hasReported: boolean;
}

export const ChatRoomMenu = ({
  chatRoomId,
  hasBlocked,
  hasReported,
}: ChatRoomMenuProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const refreshChatRoomDetail = () =>
    queryClient.invalidateQueries({
      queryKey: CHAT_ROOM_QUERY_KEY.DETAIL(chatRoomId),
      exact: true,
    });

  const reportMutation = useMutation({
    ...CHAT_MUTATION_OPTIONS.REPORT(),
    onSuccess: refreshChatRoomDetail,
  });

  const blockMutation = useMutation({
    ...CHAT_MUTATION_OPTIONS.BLOCK(),
    onSuccess: refreshChatRoomDetail,
  });

  const isProcessing = reportMutation.isPending || blockMutation.isPending;

  const handleAction = async (action: ChatBottomSheetAction) => {
    if (isProcessing) return;

    if (action !== 'block' && action !== 'report') {
      return;
    }

    try {
      if (action === 'block') {
        await blockMutation.mutateAsync(chatRoomId);
      } else {
        await reportMutation.mutateAsync({ chatRoomId });
      }

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
      {isProcessing && (
        <AsyncLoadingState
          title="처리 중이에요"
          description="잠시만 기다려 주세요."
          className="fixed inset-0 z-50 mx-auto w-full max-w-[430px] min-w-[375px] bg-white"
        />
      )}

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
        hasBlocked={hasBlocked}
        hasReported={hasReported}
        onClose={() => setOpen(false)}
        onAction={handleAction}
      />
    </>
  );
};

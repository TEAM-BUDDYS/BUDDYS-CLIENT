'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { MoreIcon } from '@/shared/components/icons';
import { ROUTES } from '@/shared/config';

import {
  BottomSheetChat,
  ChatBottomSheetAction,
} from '../../components/bottom-sheet-chat/bottom-sheet-chat';

export const ChatRoomMenu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleAction = async (action: ChatBottomSheetAction) => {
    if (action === 'block') {
      //await blockUser();
    } else if (action === 'report') {
      //await reportUser();
    } else {
      return;
    }

    //api 전송 성공 후
    router.replace(ROUTES.CHAT.ROOT);
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

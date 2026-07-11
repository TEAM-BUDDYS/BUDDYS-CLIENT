'use client';

import { useState } from 'react';

import { MoreIcon } from '@/shared/components/icons';

import { BottomSheetChat } from '../../components/bottom-sheet-chat/bottom-sheet-chat';

export const ChatRoomMenu = () => {
  const [open, setOpen] = useState(false);

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

      <BottomSheetChat open={open} onClose={() => setOpen(false)} />
    </>
  );
};

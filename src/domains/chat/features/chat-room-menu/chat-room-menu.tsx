'use client';

import { useState } from 'react';

import { MoreIcon } from '@/shared/components/icons';

import { BottomSheetChat } from '../../components/bottom-sheet-chat/bottom-sheet-chat';

export const ChatRoomMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        <MoreIcon />
      </button>

      <BottomSheetChat open={open} onClose={() => setOpen(false)} />
    </>
  );
};

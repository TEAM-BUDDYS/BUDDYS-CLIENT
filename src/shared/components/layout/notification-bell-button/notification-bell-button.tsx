'use client';

import { useState } from 'react';

import { BellIcon } from '@/shared/components/icons';
import { ComingSoonModal } from '@/shared/components/ui/modal/coming-soon-modal/coming-soon-modal';

export const NotificationBellButton = () => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="알림"
        className="-m-[11px] flex size-11 items-center justify-center"
        onClick={() => setIsComingSoonOpen(true)}
      >
        <BellIcon className="size-[22px] text-gray-800" />
      </button>

      <ComingSoonModal
        open={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </>
  );
};

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
        onClick={() => setIsComingSoonOpen(true)}
      >
        <BellIcon className="size-[22px] text-gray-800" iconOpacity={1} />
      </button>

      <ComingSoonModal
        open={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </>
  );
};

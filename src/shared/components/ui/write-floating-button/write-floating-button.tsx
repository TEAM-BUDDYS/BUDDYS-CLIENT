'use client';

import { useState } from 'react';

import { PlusIcon, XIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';
import { useClickOutside } from '@/shared/hooks/use-click-outside';

import { WriteFloatingMenu } from './write-floating-menu';

export const WriteFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <>
      {isOpen && (
        <button
          aria-label="배경 닫기"
          className="fixed inset-0 z-30 bg-black/60"
          onClick={() => setIsOpen(false)}
          tabIndex={-1}
          type="button"
        />
      )}
      <div
        ref={containerRef}
        className="pointer-events-none fixed bottom-22 left-1/2 z-40 flex w-full max-w-107.5 -translate-x-1/2 flex-col items-end px-4"
      >
        {isOpen && <WriteFloatingMenu />}
        <IconButton
          variant="primary"
          icon={isOpen ? <XIcon /> : <PlusIcon />}
          aria-label={isOpen ? '닫기' : '글쓰기'}
          aria-expanded={isOpen}
          className="pointer-events-auto"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? undefined : '글쓰기'}
        </IconButton>
      </div>
    </>
  );
};

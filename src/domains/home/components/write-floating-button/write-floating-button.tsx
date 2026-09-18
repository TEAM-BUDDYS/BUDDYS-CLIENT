'use client';

import { cn } from '@/lib/cn';
import { PlusIcon, XIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';

import { useWriteFloatingMenuTransition } from './use-write-floating-menu-transition';
import { WriteFloatingMenu } from './write-floating-menu';

export const WriteFloatingButton = () => {
  const {
    isOpen,
    isMenuMounted,
    isMenuVisible,
    containerRef,
    closeMenu,
    toggleMenu,
  } = useWriteFloatingMenuTransition<HTMLDivElement>();

  return (
    <>
      {isMenuMounted && (
        <button
          aria-label="배경 닫기"
          className={cn(
            'fixed inset-0 z-30 bg-black/60 transition-opacity duration-150 ease-out',
            isMenuVisible ? 'opacity-100' : 'opacity-0',
          )}
          onClick={closeMenu}
          tabIndex={-1}
          type="button"
        />
      )}
      <div
        ref={containerRef}
        className="pointer-events-none fixed bottom-22 left-1/2 z-40 flex w-full max-w-107.5 -translate-x-1/2 flex-col items-end px-4"
      >
        {isMenuMounted && (
          <WriteFloatingMenu
            className={cn(
              'transition-all duration-150 ease-out',
              isMenuVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-1 opacity-0',
            )}
          />
        )}
        <IconButton
          variant="primary"
          icon={isOpen ? <XIcon /> : <PlusIcon />}
          aria-label={isOpen ? '닫기' : '글쓰기'}
          aria-expanded={isOpen}
          className={cn('pointer-events-auto', !isOpen && 'h-11 px-2.5 py-0')}
          onClick={toggleMenu}
        >
          {isOpen ? undefined : '글쓰기'}
        </IconButton>
      </div>
    </>
  );
};

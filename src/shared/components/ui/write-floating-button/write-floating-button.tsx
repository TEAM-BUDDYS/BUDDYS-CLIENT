'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';
import { PlusIcon, XIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';
import { useClickOutside } from '@/shared/hooks/use-click-outside';

import { WriteFloatingMenu } from './write-floating-menu';

const MENU_TRANSITION_DURATION = 150;

export const WriteFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current === null) return;

    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }, []);

  const clearAnimationFrame = useCallback(() => {
    if (animationFrameRef.current === null) return;

    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(true);
    setIsMenuMounted(true);
    setIsMenuVisible(false);

    animationFrameRef.current = requestAnimationFrame(() => {
      setIsMenuVisible(true);
      animationFrameRef.current = null;
    });
  }, [clearCloseTimeout]);

  const closeMenu = useCallback(() => {
    clearAnimationFrame();
    setIsOpen(false);
    setIsMenuVisible(false);

    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuMounted(false);
      closeTimeoutRef.current = null;
    }, MENU_TRANSITION_DURATION);
  }, [clearAnimationFrame]);

  const containerRef = useClickOutside<HTMLDivElement>(closeMenu);

  useEffect(() => {
    return () => {
      clearCloseTimeout();
      clearAnimationFrame();
    };
  }, [clearAnimationFrame, clearCloseTimeout]);

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
          className="pointer-events-auto"
          onClick={() => (isOpen ? closeMenu() : openMenu())}
        >
          {isOpen ? undefined : '글쓰기'}
        </IconButton>
      </div>
    </>
  );
};

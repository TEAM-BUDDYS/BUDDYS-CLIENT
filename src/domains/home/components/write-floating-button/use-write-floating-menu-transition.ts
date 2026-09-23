import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useClickOutside } from '@/shared/hooks/use-click-outside';

const MENU_TRANSITION_DURATION = 150;
const MENU_FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

export const useWriteFloatingMenuTransition = <
  T extends HTMLElement = HTMLElement,
>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

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
    clearCloseTimeout();
    clearAnimationFrame();
    setIsOpen(false);
    setIsMenuVisible(false);
    triggerRef.current?.focus();

    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuMounted(false);
      closeTimeoutRef.current = null;
    }, MENU_TRANSITION_DURATION);
  }, [clearCloseTimeout, clearAnimationFrame]);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isOpen, openMenu, closeMenu]);

  const containerRef = useClickOutside<T>(closeMenu);

  useEffect(() => {
    if (!isMenuVisible) return;

    const firstItem = menuRef.current?.querySelector<HTMLElement>(
      MENU_FOCUSABLE_SELECTOR,
    );
    firstItem?.focus();
  }, [isMenuVisible]);

  const handleMenuKeyDown = useCallback(
    (event: KeyboardEvent<HTMLUListElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab' || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(MENU_FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [closeMenu],
  );

  useEffect(() => {
    return () => {
      clearCloseTimeout();
      clearAnimationFrame();
    };
  }, [clearAnimationFrame, clearCloseTimeout]);

  return {
    isOpen,
    isMenuMounted,
    isMenuVisible,
    containerRef,
    triggerRef,
    menuRef,
    handleMenuKeyDown,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};

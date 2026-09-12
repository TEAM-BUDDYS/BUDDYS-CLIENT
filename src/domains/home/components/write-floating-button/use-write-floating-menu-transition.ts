import { useCallback, useEffect, useRef, useState } from 'react';

import { useClickOutside } from '@/shared/hooks/use-click-outside';

const MENU_TRANSITION_DURATION = 150;

export const useWriteFloatingMenuTransition = <
  T extends HTMLElement = HTMLElement,
>() => {
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

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isOpen, openMenu, closeMenu]);

  const containerRef = useClickOutside<T>(closeMenu);

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
    openMenu,
    closeMenu,
    toggleMenu,
  };
};

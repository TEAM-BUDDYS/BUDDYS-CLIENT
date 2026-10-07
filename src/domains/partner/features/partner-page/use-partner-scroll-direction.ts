'use client';

import { useEffect, useRef, useState } from 'react';

const TOP_NAVIGATION_HEIGHT = 105;
const SCROLL_DIRECTION_THRESHOLD = 8;

export const usePartnerScrollDirection = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [shouldFixTopNavigation, setShouldFixTopNavigation] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY >= TOP_NAVIGATION_HEIGHT) {
        setShouldFixTopNavigation(true);
      } else if (currentScrollY === 0) {
        setShouldFixTopNavigation(false);
      }

      if (Math.abs(scrollDelta) >= SCROLL_DIRECTION_THRESHOLD) {
        setIsScrollingUp(scrollDelta < 0);
        lastScrollYRef.current = currentScrollY;
      }

      animationFrameId = null;
    };

    const handleScroll = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateScrollState);
      }
    };

    lastScrollYRef.current = window.scrollY;
    setShouldFixTopNavigation(lastScrollYRef.current >= TOP_NAVIGATION_HEIGHT);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return {
    isScrollingUp,
    shouldFixTopNavigation,
  };
};

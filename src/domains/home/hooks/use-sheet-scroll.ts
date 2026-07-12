import { useEffect, useRef } from 'react';

import { useLockBodyScroll } from '@/domains/home/hooks/use-lock-body-scroll';

const sheetScrollClassName =
  'scrollbar-none overflow-y-auto overscroll-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export const useSheetScroll = (open: boolean) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    const sheetElement = sheetRef.current;

    if (!open || !sheetElement) {
      return;
    }

    let startY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      startY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? 0;
      const deltaY = currentY - startY;
      const isAtTop = sheetElement.scrollTop <= 0;
      const isAtBottom =
        sheetElement.scrollTop + sheetElement.clientHeight >=
        sheetElement.scrollHeight;

      if ((isAtTop && deltaY > 0) || (isAtBottom && deltaY < 0)) {
        event.preventDefault();
      }
    };

    sheetElement.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    sheetElement.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    return () => {
      sheetElement.removeEventListener('touchstart', handleTouchStart);
      sheetElement.removeEventListener('touchmove', handleTouchMove);
    };
  }, [open]);

  return {
    sheetRef,
    sheetScrollClassName,
  };
};

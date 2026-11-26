'use client';

import { useEffect, useState } from 'react';

export const useChatRoomViewport = () => {
  const [style, setStyle] = useState<{ height: number; top: number }>();

  useEffect(() => {
    const viewport = window.visualViewport;
    let frameId: number | null = null;

    const updateViewport = () => {
      frameId = null;
      const height = viewport?.height ?? window.innerHeight;
      const top = viewport?.offsetTop ?? 0;

      setStyle((previous) =>
        previous?.height === height && previous.top === top
          ? previous
          : { height, top },
      );
    };

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateViewport);
      }
    };

    scheduleUpdate();
    viewport?.addEventListener('resize', scheduleUpdate);
    viewport?.addEventListener('scroll', scheduleUpdate);
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      viewport?.removeEventListener('resize', scheduleUpdate);
      viewport?.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return style;
};

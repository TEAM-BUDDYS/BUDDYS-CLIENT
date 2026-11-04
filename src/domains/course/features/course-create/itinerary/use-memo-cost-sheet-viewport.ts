import { type CSSProperties, useEffect, useState } from 'react';

export const useMemoCostSheetViewport = () => {
  const [style, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    const viewport = window.visualViewport;
    let frameId: number;

    const updateViewport = () => {
      const height = viewport?.height ?? window.innerHeight;
      const bottom = Math.max(
        0,
        window.innerHeight - height - (viewport?.offsetTop ?? 0),
      );
      setStyle((previous) =>
        previous?.bottom === bottom && previous.maxHeight === height
          ? previous
          : { bottom, maxHeight: height },
      );
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateViewport);
    };

    scheduleUpdate();
    viewport?.addEventListener('resize', scheduleUpdate);
    viewport?.addEventListener('scroll', scheduleUpdate);
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      viewport?.removeEventListener('resize', scheduleUpdate);
      viewport?.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return style;
};

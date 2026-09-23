import { useEffect } from 'react';

export const useNonModalPointerEvents = (open: boolean, modal: boolean) => {
  useEffect(() => {
    if (!open || modal) return;

    const frameId = requestAnimationFrame(() => {
      document.body.style.pointerEvents = 'auto';
    });

    return () => cancelAnimationFrame(frameId);
  }, [modal, open]);
};

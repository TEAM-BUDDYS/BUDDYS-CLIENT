import { useEffect, useRef } from 'react';

interface UseInfiniteScrollParams {
  enabled: boolean;
  onIntersect: () => void;
  rootMargin?: string;
}

export const useInfiniteScroll = <T extends HTMLElement>({
  enabled,
  onIntersect,
  rootMargin = '160px',
}: UseInfiniteScrollParams) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const target = ref.current;

    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onIntersect, rootMargin]);

  return ref;
};

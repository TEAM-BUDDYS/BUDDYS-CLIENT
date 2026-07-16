'use client';

import Autoplay from 'embla-carousel-autoplay';
import { useMemo } from 'react';

import { useCarouselIndex } from '@/shared/hooks/use-carousel-index';

const createAutoplayPlugin = () =>
  Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

export const useHomeCarousel = (itemCount: number) => {
  const canLoop = itemCount > 1;
  const autoplayPlugins = useMemo(
    () => (canLoop ? [createAutoplayPlugin()] : []),
    [canLoop],
  );

  return useCarouselIndex(
    {
      align: 'start',
      loop: canLoop,
    },
    autoplayPlugins,
  );
};

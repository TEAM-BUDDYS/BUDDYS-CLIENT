'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

type CarouselIndexOptions = Parameters<typeof useEmblaCarousel>[0];

export const useCarouselIndex = (options?: CarouselIndexOptions) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleIndexChange = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return {
    currentIndex,
    emblaRef,
    handleIndexChange,
  };
};

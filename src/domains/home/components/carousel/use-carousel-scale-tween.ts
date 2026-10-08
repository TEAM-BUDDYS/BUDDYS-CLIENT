'use client';

import { useCallback, useEffect, useRef } from 'react';

import type { useHomeCarousel } from './use-home-carousel';

type HomeCarouselApi = ReturnType<typeof useHomeCarousel>['emblaApi'];
type EmblaApi = NonNullable<HomeCarouselApi>;

const TWEEN_FACTOR_BASE = 0.4;
const MIN_SCALE = 0.875;
const TWEEN_NODE_SELECTOR = '[data-carousel-slide-inner]';

export const useCarouselScaleTween = (emblaApi: HomeCarouselApi) => {
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaApi) => {
    tweenNodes.current = emblaApi
      .slideNodes()
      .map((slideNode) =>
        slideNode.querySelector<HTMLElement>(TWEEN_NODE_SELECTOR),
      )
      .filter((node): node is HTMLElement => Boolean(node));
  }, []);

  const tweenScale = useCallback((emblaApi: EmblaApi, eventName?: string) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];
      const isSelectedSnap = snapIndex === emblaApi.selectedScrollSnap();

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) {
          return;
        }

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }

              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR_BASE);
        const scale = isSelectedSnap
          ? 1
          : Math.min(Math.max(tweenValue, MIN_SCALE), 1);
        const tweenNode = tweenNodes.current[slideIndex];

        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`;
          tweenNode.style.transformOrigin =
            diffToTarget < 0 ? 'right center' : 'left center';
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    setTweenNodes(emblaApi);
    tweenScale(emblaApi);

    emblaApi.on('reInit', setTweenNodes);
    emblaApi.on('reInit', tweenScale);
    emblaApi.on('scroll', tweenScale);
    emblaApi.on('slideFocus', tweenScale);

    return () => {
      emblaApi.off('reInit', setTweenNodes);
      emblaApi.off('reInit', tweenScale);
      emblaApi.off('scroll', tweenScale);
      emblaApi.off('slideFocus', tweenScale);
    };
  }, [emblaApi, setTweenNodes, tweenScale]);
};

'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useCarouselIndex } from '@/shared/hooks/use-carousel-index';

import { INTRO_SLIDES } from '../../model/intro';
import { IntroSlide } from './intro-slide';

export const IntroFlow = () => {
  const { currentIndex, emblaRef, handleIndexChange } = useCarouselIndex({
    align: 'start',
    loop: false,
  });
  const router = useRouter();

  const isLastSlide = currentIndex === INTRO_SLIDES.length - 1;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white px-4 py-8.5">
      {/* 배경: 왼쪽 원 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[57px] right-0 h-[605px] w-[602px] rounded-full"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, #D5DEFF 0%, rgba(237, 246, 255, 0) 100%)',
        }}
      />
      {/* 배경: 오른쪽 원 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[79px] left-[96px] h-[561px] w-[558px] rounded-full"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, #C1E1FF 0%, rgba(237, 246, 255, 0) 100%)',
        }}
      />

      <div className="flex flex-1 flex-col justify-center">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {INTRO_SLIDES.map((slide) => (
              <div
                key={slide.titleLines[0]}
                className="min-w-0 flex-[0_0_100%]"
              >
                <IntroSlide {...slide} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex justify-center gap-2">
          {INTRO_SLIDES.map((slide, index) => (
            <button
              key={slide.titleLines[0]}
              type="button"
              onClick={() => handleIndexChange(index)}
              aria-label={`${index + 1}번째 소개 화면 보기`}
              aria-current={index === currentIndex ? 'step' : undefined}
              className={
                index === currentIndex
                  ? 'bg-mint-300 size-2 rounded-full'
                  : 'size-2 rounded-full bg-gray-200'
              }
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8">
        <Button
          disabled={!isLastSlide}
          onClick={() => router.push(ROUTES.ONBOARDING)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

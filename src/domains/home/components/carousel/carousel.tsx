'use client';

import Link from 'next/link';

import type { RecommendedPost } from '@/shared/api/recommended-posts/type';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { CarouselIndicator } from './carousel-indicator';
import { CarouselInfo } from './carousel-info';
import { useCarouselScaleTween } from './use-carousel-scale-tween';
import { useHomeCarousel } from './use-home-carousel';

export type RenderableRecommendedPost = RecommendedPost & {
  postId: number;
  title: string;
  thumbnailUrl: string;
  country: {
    name: string;
  };
};

interface CarouselProps {
  posts: RecommendedPost[];
}

export const isRenderableRecommendedPost = (
  post: RecommendedPost,
): post is RenderableRecommendedPost => {
  return Boolean(
    post.postId && post.title && post.thumbnailUrl && post.country?.name,
  );
};

export const Carousel = ({ posts }: CarouselProps) => {
  const items = posts.filter(isRenderableRecommendedPost);
  const { currentIndex, emblaApi, emblaRef, handleIndexChange } =
    useHomeCarousel(items.length);

  useCarouselScaleTween(emblaApi);

  if (items.length === 0) return null;

  return (
    <div className="-mx-4 flex flex-col items-center gap-3">
      <div ref={emblaRef} className="w-full overflow-hidden rounded-2xl">
        <div className="flex">
          {items.map((item, index) => (
            <Link
              key={item.postId}
              href={ROUTES.POST.DETAIL(item.postId)}
              className="flex min-w-0 shrink-0 grow-0 basis-84.75 justify-center"
            >
              <div
                data-carousel-slide-inner
                className="relative h-60 w-81.75 origin-center overflow-hidden rounded-2xl transition-transform duration-100 ease-out"
              >
                <CommonImage
                  src={item.thumbnailUrl}
                  alt={item.title}
                  width={412}
                  height={264}
                  sizes="327px"
                  preload={index === 0}
                  radius="rounded-lg"
                  className="block size-full"
                />

                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60" />

                <div className="absolute inset-5">
                  <CarouselInfo
                    authorProfileImageUrl={
                      item.authorProfileImageUrl || defaultProfileImage.src
                    }
                    title={item.title}
                    nickName="Taek2"
                    country={item.country.name}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CarouselIndicator
        total={items.length}
        currentIndex={currentIndex}
        onChange={handleIndexChange}
      />
    </div>
  );
};

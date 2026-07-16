'use client';

import Link from 'next/link';

import type { RecommendedPost } from '@/shared/api/recommended-posts/type';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { CarouselIndicator } from './carousel-indicator';
import { CarouselInfo } from './carousel-info';
import { useHomeCarousel } from './use-home-carousel';

export type RenderableRecommendedPost = RecommendedPost & {
  postId: number;
  title: string;
  thumbnailUrl: string;
  country: {
    name: string;
  };
  viewCount: number;
};

interface CarouselProps {
  posts: RecommendedPost[];
}

export const isRenderableRecommendedPost = (
  post: RecommendedPost,
): post is RenderableRecommendedPost => {
  return Boolean(
    post.postId &&
    post.title &&
    post.thumbnailUrl &&
    post.country?.name &&
    post.viewCount !== undefined,
  );
};

export const Carousel = ({ posts }: CarouselProps) => {
  const items = posts.filter(isRenderableRecommendedPost);
  const { currentIndex, emblaRef, handleIndexChange } = useHomeCarousel(
    items.length,
  );

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={emblaRef} className="w-full overflow-hidden rounded-lg">
        <div className="-ml-3 flex">
          {items.map((item, index) => (
            <Link
              key={item.postId}
              href={ROUTES.POST.DETAIL(item.postId)}
              className="min-w-0 shrink-0 grow-0 basis-full pl-3"
            >
              <div className="relative aspect-[412/264] overflow-hidden rounded-lg">
                <CommonImage
                  src={item.thumbnailUrl}
                  alt={item.title}
                  width={412}
                  height={264}
                  sizes="(max-width: 430px) calc(100vw - 32px), 398px"
                  preload={index === 0}
                  radius="rounded-lg"
                  className="block size-full"
                />

                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/40" />

                <div className="absolute bottom-5 left-5">
                  <CarouselInfo
                    authorProfileImageUrl={
                      item.authorProfileImageUrl || defaultProfileImage.src
                    }
                    title={item.title}
                    country={item.country.name}
                    viewCount={item.viewCount}
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

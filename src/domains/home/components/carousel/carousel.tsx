'use client';

import Link from 'next/link';

import type { RecommendedPost } from '@/shared/api/recommended-posts/type';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useCarouselIndex } from '@/shared/hooks/use-carousel-index';

import { CarouselIndicator } from './carousel-indicator';
import { CarouselInfo } from './carousel-info';

type RenderableRecommendedPost = RecommendedPost & {
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

const isRenderableRecommendedPost = (
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
  const { currentIndex, emblaRef, handleIndexChange } = useCarouselIndex({
    loop: true,
  });
  const items = posts.filter(isRenderableRecommendedPost);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={emblaRef} className="w-full overflow-hidden rounded-lg">
        <div className="flex">
          {items.map((item) => (
            <Link
              key={item.postId}
              href={ROUTES.POST.DETAIL(item.postId)}
              className="relative block aspect-[412/264] w-full shrink-0 overflow-hidden rounded-lg"
            >
              <CommonImage
                src={item.thumbnailUrl}
                alt={item.title}
                width={412}
                height={264}
                unoptimized
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

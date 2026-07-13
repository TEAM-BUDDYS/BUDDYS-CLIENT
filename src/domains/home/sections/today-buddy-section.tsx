'use client';

import { useQuery } from '@tanstack/react-query';

import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { RECOMMENDATION_QUERY_OPTIONS } from '@/shared/api';
import { defaultProfileImage } from '@/shared/assets/illustrations';
import { CommonImage } from '@/shared/components/ui';

import { Carousel, type CarouselItem } from '../components/carousel/carousel';

const temporaryHeaderImage =
  "data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='84' height='84' rx='16' fill='%23F1F4F9'/%3E%3Ccircle cx='42' cy='34' r='14' fill='%23CDD3DE'/%3E%3Cpath d='M20 70C23.7 56.3 31.9 48 42 48C52.1 48 60.3 56.3 64 70H20Z' fill='%23CDD3DE'/%3E%3C/svg%3E";

const TODAY_BUDDY_SIZE = 3;
const temporaryPostImage = (postId: number) =>
  `https://loremflickr.com/412/264/travel?random=${postId}`;

export const TodayBuddySection = () => {
  const { data } = useQuery(
    RECOMMENDATION_QUERY_OPTIONS.RECOMMENDED_POSTS({
      size: TODAY_BUDDY_SIZE,
    }),
  );

  const items: CarouselItem[] = (data?.data?.posts ?? [])
    .filter((post) => post.postId && post.title)
    .map(({ postId, title, thumbnailUrl }) => ({
      href: `/posts/${postId}`,
      imageUrl: thumbnailUrl ?? temporaryPostImage(postId ?? 0),
      carouselInfo: {
        profileImageUrl: defaultProfileImage.src,
        title: title ?? '',
        country: '국가',
        viewCount: 0,
      },
    }));

  return (
    <section className="flex flex-col gap-5 pt-5">
      <SectionHeader
        label="오늘의 추천 동행"
        title="함께 떠날 버디를 찾아보세요"
        rightSlot={
          <CommonImage
            src={temporaryHeaderImage}
            alt="오늘의 추천 동행 이미지"
            width={44}
            height={44}
            radius="rounded-lg"
            unoptimized
            className="size-11"
          />
        }
      />
      <Carousel items={items} />
    </section>
  );
};

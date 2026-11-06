'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { HOME_QUERY_OPTIONS } from '@/domains/home/api/query';
import { MagazineCard } from '@/domains/home/components/magazine-card/magazine-card';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import {
  ImageCardSkeleton,
  SkeletonList,
} from '@/domains/home/components/skeleton';
import { useCurrentMonth } from '@/domains/home/hooks/use-current-month';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

const BUDDYS_MAGAZINE_SIZE = 2;

const BuddysMagazineListSkeleton = () => {
  return (
    <SkeletonList
      count={BUDDYS_MAGAZINE_SIZE}
      label="버디즈 매거진을 불러오는 중"
      className="flex flex-col gap-5"
    >
      <ImageCardSkeleton />
    </SkeletonList>
  );
};

const BuddysMagazineList = () => {
  const { data: response } = useSuspenseQuery(
    HOME_QUERY_OPTIONS.MAGAZINES({
      category: 'SUPPORT',
      sort: 'LATEST',
      page: 0,
      size: BUDDYS_MAGAZINE_SIZE,
    }),
  );

  const magazines = response.data.magazines;

  if (magazines.length === 0) {
    return (
      <EmptyState
        title="등록된 매거진이 없어요"
        description="새로운 매거진을 준비하고 있어요"
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {magazines.map((magazine) => (
        <MagazineCard
          key={magazine.magazineId}
          title={magazine.title}
          description={magazine.summary}
          image={{
            src: magazine.thumbnailImageUrl,
            alt: `${magazine.title} 썸네일`,
          }}
          href={magazine.externalUrl}
        />
      ))}
    </div>
  );
};

export const BuddysMagazineSection = () => {
  const month = useCurrentMonth();

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title={month ? `${month}월 버디즈 매거진` : '버디즈 매거진'}
        moreHref={ROUTES.MAGAZINE}
      />

      <AsyncBoundary loadingFallback={<BuddysMagazineListSkeleton />}>
        <BuddysMagazineList />
      </AsyncBoundary>
    </section>
  );
};

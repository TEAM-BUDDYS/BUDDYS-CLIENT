'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { RECOMMENDATION_QUERY_OPTIONS } from '@/shared/api';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';

import {
  Carousel,
  isRenderableRecommendedPost,
} from '../components/carousel/carousel';

const TODAY_BUDDY_SIZE = 3;

const TodayBuddyPostList = () => {
  const { data } = useSuspenseQuery(
    RECOMMENDATION_QUERY_OPTIONS.RECOMMENDED_POSTS({
      size: TODAY_BUDDY_SIZE,
      requireImage: true,
    }),
  );

  const posts = (data?.data?.posts ?? []).filter(isRenderableRecommendedPost);
  const isEmpty = posts.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        title="아직 추천할 동행 게시물이 없어요"
        description="관심 정보가 쌓이면 더 잘 맞는 동행을 보여드릴게요"
        className="py-8"
      />
    );
  }

  return <Carousel posts={posts} />;
};

export const TodayBuddySection = () => {
  return (
    <section className="flex flex-col gap-5 pt-5">
      <SectionHeader
        label="오늘의 추천 동행"
        title="함께 떠날 버디를 찾아보세요"
      />
      <AsyncBoundary className="py-8">
        <TodayBuddyPostList />
      </AsyncBoundary>
    </section>
  );
};

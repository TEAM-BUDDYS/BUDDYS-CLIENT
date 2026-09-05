'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { HOME_QUERY_OPTIONS } from '@/domains/home/api/query';
import type { ExchangeCountryRecommendedUser } from '@/domains/home/api/type';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { ProfileCard } from '@/domains/partner/components/profile-card/profile-card';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';

const SAME_COUNTRY_BUDDY_SIZE = 5;

type RenderableUser = ExchangeCountryRecommendedUser & {
  userId: number;
  nickname: string;
  exchangeCountry: {
    name: string;
  };
  ageRange: string;
  matchingPercentage: number;
};

const isRenderableUser = (
  user: ExchangeCountryRecommendedUser,
): user is RenderableUser => {
  return Boolean(
    user.userId &&
    user.nickname &&
    user.exchangeCountry?.name &&
    user.ageRange &&
    user.matchingPercentage !== undefined,
  );
};

const SameCountryBuddyList = () => {
  const { data } = useSuspenseQuery(
    HOME_QUERY_OPTIONS.EXCHANGE_COUNTRY_RECOMMENDED_USERS({
      size: SAME_COUNTRY_BUDDY_SIZE,
    }),
  );

  const users = (data?.data?.users ?? []).filter(isRenderableUser);
  const isEmpty = users.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        title="아직 추천할 버디가 없어요"
        description="프로필과 관심 정보를 채우면 더 잘 맞는 버디를 찾을 수 있어요"
        className="py-8"
      />
    );
  }

  return (
    <div className="-mx-4 scrollbar-none overflow-x-auto px-4">
      <div className="flex gap-3">
        {users.map((user) => (
          <ProfileCard
            key={user.userId}
            userId={user.userId}
            nickname={user.nickname}
            countryName={user.exchangeCountry.name}
            ageRange={user.ageRange}
            matchingPercentage={user.matchingPercentage}
            profileImageUrl={user.profileImageUrl}
          />
        ))}
        <div aria-hidden="true" className="w-2 shrink-0" />
      </div>
    </div>
  );
};

export const SameCountryBuddySection = () => {
  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        label="오늘의 추천 동행"
        title="같은 파견 국가의 학생이에요"
      />
      <AsyncBoundary
        className="py-8"
        loadingFallback={<div className="min-h-42" aria-busy="true" />}
      >
        <SameCountryBuddyList />
      </AsyncBoundary>
    </section>
  );
};

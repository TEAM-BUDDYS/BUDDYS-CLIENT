'use client';

import { useQuery } from '@tanstack/react-query';

import { useAuthSession } from '@/domains/auth/features/auth-session/auth-session-provider';
import { HOME_QUERY_OPTIONS } from '@/domains/home/api/query';
import { CardProfile } from '@/domains/home/components/card-profile/card-profile';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';

const SAME_COUNTRY_BUDDY_SIZE = 5;

export const SameCountryBuddySection = () => {
  const { status } = useAuthSession();
  const { data } = useQuery({
    ...HOME_QUERY_OPTIONS.EXCHANGE_COUNTRY_RECOMMENDED_USERS({
      size: SAME_COUNTRY_BUDDY_SIZE,
    }),
    enabled: status === 'authenticated',
  });

  const users = (data?.data?.users ?? []).filter((user) => user.userId);

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        label="오늘의 추천 동행"
        title="같은 파견 국가의 학생이에요"
      />

      <div className="-mx-4 scrollbar-none overflow-x-auto px-4">
        <div className="flex gap-3">
          {users.map((user) => (
            <CardProfile key={user.userId} {...user} />
          ))}
          <div aria-hidden="true" className="w-2 shrink-0" />
        </div>
      </div>
    </section>
  );
};

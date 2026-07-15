'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';
import { Header } from '@/shared/components/layout';
import { EmptyState } from '@/shared/components/ui';

import { OtherProfilePageView } from '../other-profile-page-view/other-profile-page-view';

interface OtherProfileContainerProps {
  userId: number;
}

export const OtherProfileContainer = ({
  userId,
}: OtherProfileContainerProps) => {
  const { data: profile } = useSuspenseQuery(
    PROFILE_QUERY_OPTIONS.USER_PROFILE(userId),
  );

  if (!profile) {
    return (
      <main className="relative min-h-dvh bg-white">
        <Header hasBackButton />
        <EmptyState
          className="absolute top-[calc(50%-10px)] left-1/2 -translate-x-1/2 -translate-y-1/2"
          title="사용자를 찾을 수 없어요"
          description="존재하지 않거나 삭제된 사용자예요"
        />
      </main>
    );
  }

  return <OtherProfilePageView profile={profile} />;
};

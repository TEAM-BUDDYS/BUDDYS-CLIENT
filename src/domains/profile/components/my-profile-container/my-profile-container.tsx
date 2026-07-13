'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';
import { AsyncBoundary, AsyncErrorState } from '@/shared/components/ui';

import { ProfilePageView } from '../profile-page-view/profile-page-view';

function ProfileQuery() {
  const { data } = useSuspenseQuery(PROFILE_QUERY_OPTIONS.ME());

  return <ProfilePageView profile={data} />;
}

export function MyProfileContainer() {
  return (
    <AsyncBoundary
      loadingState={{ title: '프로필을 불러오고 있어요' }}
      errorFallback={({ error, reset }) => (
        <AsyncErrorState
          title="프로필을 불러오지 못했어요"
          description={error instanceof Error ? error.message : undefined}
          onRetry={reset}
        />
      )}
    >
      <ProfileQuery />
    </AsyncBoundary>
  );
}

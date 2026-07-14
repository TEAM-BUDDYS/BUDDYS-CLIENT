'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';

import { ProfilePageView } from '../profile-page-view/profile-page-view';

export function MyProfileContainer() {
  const { data: profile } = useSuspenseQuery(PROFILE_QUERY_OPTIONS.ME());

  return <ProfilePageView profile={profile} />;
}

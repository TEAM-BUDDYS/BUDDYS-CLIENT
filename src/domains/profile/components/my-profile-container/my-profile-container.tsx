'use client';

import { useQuery } from '@tanstack/react-query';

import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';

import { ProfilePageView } from '../profile-page-view/profile-page-view';

export function MyProfileContainer() {
  const { data, isPending, isError } = useQuery(PROFILE_QUERY_OPTIONS.ME());

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError || !data) {
    return <div>프로필을 불러오지 못했습니다.</div>;
  }

  return <ProfilePageView profile={data} />;
}

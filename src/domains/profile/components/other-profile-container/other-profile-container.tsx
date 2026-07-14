'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';

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

  return <OtherProfilePageView profile={profile} />;
};

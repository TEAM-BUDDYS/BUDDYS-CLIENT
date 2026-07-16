'use client';

import {
  usePrefetchInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { PROFILE_QUERY_OPTIONS } from '@/domains/profile/api/query';
import { MY_POSTS_PAGE_SIZE } from '@/domains/profile/model/content';

import { ProfilePageView } from '../profile-page-view/profile-page-view';

export const MyProfileContainer = () => {
  usePrefetchInfiniteQuery(
    PROFILE_QUERY_OPTIONS.ME_POSTS_INFINITE({ size: MY_POSTS_PAGE_SIZE }),
  );

  const { data: profile } = useSuspenseQuery(PROFILE_QUERY_OPTIONS.ME());

  return <ProfilePageView profile={profile} />;
};

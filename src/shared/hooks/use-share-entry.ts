'use client';

import { useSearchParams } from 'next/navigation';

import { SHARE_ENTRY } from '@/shared/constants/share';

export const useIsShareEntry = () => {
  const searchParams = useSearchParams();

  return searchParams.get(SHARE_ENTRY.PARAM) === SHARE_ENTRY.VALUE;
};

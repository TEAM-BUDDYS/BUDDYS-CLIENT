'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import type { CourseCompanion } from '@/domains/course/api/type';
import { COURSE_COMPANION_QUERY_OPTIONS } from '@/domains/course/api/user';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { COURSE_CREATE_SEARCH_DEBOUNCE_MS } from '../constants';

const COURSE_COMPANION_SEARCH_PAGE_SIZE = 20;

const getUniqueCompanions = (companions: CourseCompanion[]) => {
  const companionIds = new Set<number>();

  return companions.filter(({ userId }) => {
    if (companionIds.has(userId)) {
      return false;
    }

    companionIds.add(userId);
    return true;
  });
};

interface UseCourseCompanionSearchParams {
  keyword: string;
}

export const useCourseCompanionSearch = ({
  keyword,
}: UseCourseCompanionSearchParams) => {
  const normalizedKeyword = keyword.trim();
  const debouncedKeyword = useDebouncedValue(
    normalizedKeyword,
    COURSE_CREATE_SEARCH_DEBOUNCE_MS,
  );
  const hasKeyword = normalizedKeyword.length > 0;
  const isDebouncing = normalizedKeyword !== debouncedKeyword;
  const canSearch = hasKeyword && !isDebouncing;
  const companionSearchQuery = useInfiniteQuery({
    ...COURSE_COMPANION_QUERY_OPTIONS.SEARCH({
      keyword: debouncedKeyword,
      size: COURSE_COMPANION_SEARCH_PAGE_SIZE,
    }),
    enabled: canSearch,
  });

  const companions = canSearch
    ? getUniqueCompanions(
        companionSearchQuery.data?.pages.flatMap((page) => page.users) ?? [],
      )
    : [];

  const loadMore = () => {
    if (
      companionSearchQuery.hasNextPage &&
      !companionSearchQuery.isFetchingNextPage
    ) {
      void companionSearchQuery.fetchNextPage();
    }
  };

  const retry = () => {
    if (companionSearchQuery.isFetchNextPageError) {
      void companionSearchQuery.fetchNextPage();
      return;
    }

    void companionSearchQuery.refetch();
  };

  return {
    companions,
    hasKeyword,
    isEmpty:
      canSearch &&
      !companionSearchQuery.isFetching &&
      !companionSearchQuery.isError &&
      companions.length === 0,
    isError: canSearch && companionSearchQuery.isError,
    isSearching:
      hasKeyword && (isDebouncing || companionSearchQuery.isFetching),
    loadMore,
    retry,
  };
};

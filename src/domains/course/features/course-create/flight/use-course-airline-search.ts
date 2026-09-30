'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { AIRLINE_QUERY_OPTIONS } from '@/domains/course/api/query';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { COURSE_CREATE_SEARCH_DEBOUNCE_MS } from '../constants';

const AIRLINE_SEARCH_PAGE_SIZE = 20;

interface UseCourseAirlineSearchParams {
  keyword: string;
  enabled: boolean;
}

export const useCourseAirlineSearch = ({
  keyword,
  enabled,
}: UseCourseAirlineSearchParams) => {
  const normalizedKeyword = keyword.trim();
  const searchKeyword = useDebouncedValue(
    normalizedKeyword,
    COURSE_CREATE_SEARCH_DEBOUNCE_MS,
  );
  const hasKeyword = normalizedKeyword.length > 0;
  const isDebouncing = normalizedKeyword !== searchKeyword;
  const canSearch = enabled && hasKeyword && !isDebouncing;
  const airlineSearchQuery = useInfiniteQuery({
    ...AIRLINE_QUERY_OPTIONS.SEARCH({
      keyword: searchKeyword,
      size: AIRLINE_SEARCH_PAGE_SIZE,
    }),
    enabled: canSearch,
  });

  const loadMore = () => {
    if (
      airlineSearchQuery.hasNextPage &&
      !airlineSearchQuery.isFetchingNextPage
    ) {
      void airlineSearchQuery.fetchNextPage();
    }
  };

  const retry = () => {
    void airlineSearchQuery.refetch();
  };

  const airlines = canSearch
    ? (airlineSearchQuery.data?.pages.flatMap((page) => page.airlines) ?? [])
    : [];

  return {
    airlines,
    isError: canSearch && airlineSearchQuery.isError,
    isSearching:
      enabled && hasKeyword && (isDebouncing || airlineSearchQuery.isFetching),
    loadMore,
    retry,
  };
};

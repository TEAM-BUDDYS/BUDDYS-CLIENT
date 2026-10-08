import type { SearchSort } from '@/domains/home/api/type';

export const SEARCH_SORT_LABEL = {
  LATEST: '최신순',
  BOOKMARK: '저장순',
} as const satisfies Record<SearchSort, string>;

export const searchSortOptions: string[] = Object.values(SEARCH_SORT_LABEL);

export const getSearchSortByLabel = (label: string): SearchSort => {
  const sort = (Object.keys(SEARCH_SORT_LABEL) as SearchSort[]).find(
    (sortKey) => SEARCH_SORT_LABEL[sortKey] === label,
  );

  return sort ?? 'LATEST';
};

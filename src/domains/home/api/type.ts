import type { components, operations } from '@/types/schema';

export type GetMagazinesParams =
  operations['getMagazines']['parameters']['query'];

export type GetMagazinesResponse =
  components['schemas']['MagazineListSuccessResponse'];
export type SearchParams = operations['search']['parameters']['query'];
export type SearchType = NonNullable<SearchParams['type']>;
export type SearchSort = NonNullable<SearchParams['sort']>;
export type SearchInfiniteParams = Omit<SearchParams, 'page' | 'type'> & {
  type: SearchType;
};

export type GetSearchResponse =
  components['schemas']['BaseResponseSearchResponse'];
export type SearchResult = components['schemas']['SearchResponse'];

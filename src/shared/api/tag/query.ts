import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import { TAG_QUERY_KEY } from '../query-key';
import type { GetTagsResponse, PreferenceTag, TagType } from './type';

const isPreferenceTag = (tag: unknown): tag is PreferenceTag => {
  if (typeof tag !== 'object' || tag === null) {
    return false;
  }

  const { id, name } = tag as Partial<PreferenceTag>;

  return typeof id === 'number' && typeof name === 'string';
};

const getTags = async (type: TagType): Promise<PreferenceTag[]> => {
  const response = await apiClient
    .get(END_POINT.TAG.LIST(type))
    .json<GetTagsResponse>();

  if (!response.success) {
    throw new Error(response.message || '태그 목록을 불러오지 못했습니다.');
  }

  if (
    !Array.isArray(response.data) ||
    response.data.length === 0 ||
    !response.data.every(isPreferenceTag)
  ) {
    throw new Error('태그 목록 응답 형식이 올바르지 않습니다.');
  }

  return response.data.map(({ id, name }) => ({ id, name }));
};

export const TAG_QUERY_OPTIONS = {
  LIST: (type: TagType) =>
    queryOptions({
      queryKey: TAG_QUERY_KEY.LIST(type),
      queryFn: () => getTags(type),
    }),
};

import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import { TAG_QUERY_KEY } from '../query-key';
import type { GetTagsResponse, PreferenceTag, TagType } from './type';

const getTags = async (type: TagType): Promise<PreferenceTag[]> => {
  const response = await apiClient
    .get(END_POINT.TAG.LIST(type))
    .json<GetTagsResponse>();

  if (!response.success) {
    throw new Error(response.message || '태그 목록을 불러오지 못했습니다.');
  }

  return (response.data ?? []).flatMap((tag) =>
    typeof tag.id === 'number' && typeof tag.name === 'string'
      ? [{ id: tag.id, name: tag.name }]
      : [],
  );
};

export const TAG_QUERY_OPTIONS = {
  LIST: (type: TagType) =>
    queryOptions({
      queryKey: TAG_QUERY_KEY.LIST(type),
      queryFn: () => getTags(type),
    }),
};

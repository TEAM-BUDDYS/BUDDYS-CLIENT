import { queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  PLACE_QUERY_KEY,
} from '@/shared/api';

import type {
  GetNearbyPlacesParams,
  GetNearbyPlacesResponse,
  Place,
} from './type';

const getNearbyPlaces = async (
  params: GetNearbyPlacesParams,
): Promise<Place[]> => {
  const response = await apiClient
    .get(END_POINT.PLACE.NEARBY, {
      searchParams: createSearchParams(params),
    })
    .json<GetNearbyPlacesResponse>();

  if (!response.success || !response.data) {
    throw new Error(response.message || '근처 장소를 불러오지 못했습니다.');
  }

  return response.data.places ?? [];
};

export const PLACE_QUERY_OPTIONS = {
  NEARBY: (params: GetNearbyPlacesParams | null) =>
    queryOptions({
      queryKey: PLACE_QUERY_KEY.NEARBY(params),
      queryFn: () => {
        if (!params) {
          throw new Error('근처 장소 조회 좌표가 필요합니다.');
        }

        return getNearbyPlaces(params);
      },
      enabled: params !== null,
    }),
};

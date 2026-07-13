import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import { COUNTRY_QUERY_KEY } from '../query-key';
import { createSearchParams } from '../search-params';
import type { GetCountriesParams, GetCountriesResponse } from './type';

const getCountries = async (params?: GetCountriesParams) => {
  return apiClient
    .get(END_POINT.COUNTRY.LIST, {
      searchParams: createSearchParams(params),
    })
    .json<GetCountriesResponse>();
};

export const COUNTRY_QUERY_OPTIONS = {
  LIST: (params?: GetCountriesParams) =>
    queryOptions({
      queryKey: COUNTRY_QUERY_KEY.LIST(params),
      queryFn: () => getCountries(params),
    }),
};

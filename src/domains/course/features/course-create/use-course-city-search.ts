'use client';

import { useQueries } from '@tanstack/react-query';

import { CITY_QUERY_OPTIONS, type Country } from '@/shared/api';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { COURSE_CREATE_SEARCH_DEBOUNCE_MS } from './constants';
import type { CourseCreateCityOption } from './model';

interface UseCourseCitySearchParams {
  countries: Country[];
  keyword: string;
  isInputSelected: boolean;
}

export const useCourseCitySearch = ({
  countries,
  keyword,
  isInputSelected,
}: UseCourseCitySearchParams) => {
  const trimmedKeyword = keyword.trim();
  const debouncedKeyword = useDebouncedValue(
    trimmedKeyword,
    COURSE_CREATE_SEARCH_DEBOUNCE_MS,
  );
  const isKeywordSynced = debouncedKeyword === trimmedKeyword;
  const isSearchEnabled =
    !isInputSelected &&
    countries.length > 0 &&
    trimmedKeyword.length > 0 &&
    isKeywordSynced;
  const citySearchQueries = useQueries({
    queries: countries.map(({ id }) => ({
      ...CITY_QUERY_OPTIONS.SEARCH(id, debouncedKeyword),
      enabled: isSearchEnabled,
    })),
  });
  const seenCityIds = new Set<number>();
  const cities = isSearchEnabled
    ? citySearchQueries.reduce<CourseCreateCityOption[]>(
        (results, query, index) => {
          const country = countries[index];

          if (!country) {
            return results;
          }

          query.data?.forEach((city) => {
            if (
              city.id === undefined ||
              city.name === undefined ||
              seenCityIds.has(city.id)
            ) {
              return;
            }

            seenCityIds.add(city.id);
            results.push({
              id: city.id,
              name: city.name,
              koreanName: city.koreanName,
              countryId: country.id,
            });
          });

          return results;
        },
        [],
      )
    : [];
  const isFetching = citySearchQueries.some((query) => query.isFetching);

  return {
    cities,
    isError:
      isSearchEnabled && citySearchQueries.some((query) => query.isError),
    isSearching:
      !isInputSelected &&
      countries.length > 0 &&
      trimmedKeyword.length > 0 &&
      (!isKeywordSynced || isFetching),
  };
};

import type { City } from './type';

const ENGLISH_KEYWORD_PATTERN = /[a-zA-Z]/;

type CityName = Pick<City, 'name' | 'koreanName'>;

export const getCityDisplayName = (city?: CityName | null, keyword = '') => {
  if (ENGLISH_KEYWORD_PATTERN.test(keyword.trim())) {
    return city?.name ?? city?.koreanName ?? '';
  }

  return city?.koreanName ?? city?.name ?? '';
};

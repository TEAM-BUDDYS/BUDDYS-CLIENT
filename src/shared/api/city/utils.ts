import type { City } from './type';

const ENGLISH_KEYWORD_PATTERN = /[a-zA-Z]/;

export const getCityDisplayName = (city?: City | null, keyword = '') => {
  if (ENGLISH_KEYWORD_PATTERN.test(keyword.trim())) {
    return city?.name ?? city?.koreanName ?? '';
  }

  return city?.koreanName ?? city?.name ?? '';
};

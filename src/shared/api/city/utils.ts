import type { City } from './type';

export const getCityDisplayName = (city?: City | null) => {
  return city?.koreanName ?? city?.name ?? '';
};

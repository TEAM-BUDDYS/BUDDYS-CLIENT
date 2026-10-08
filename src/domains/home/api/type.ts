import type { components, operations } from '@/types/schema';

export type GetMagazinesParams =
  operations['getMagazines']['parameters']['query'];

export type GetMagazinesResponse =
  components['schemas']['MagazineListSuccessResponse'];

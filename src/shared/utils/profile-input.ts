import { NICKNAME_MAX_LENGTH } from '@/shared/constants/nickname';

export const PROFILE_BIO_MAX_LENGTH = 30;

export const limitNickname = (value: string) =>
  value.slice(0, NICKNAME_MAX_LENGTH);

export const limitProfileBio = (value: string) =>
  value.slice(0, PROFILE_BIO_MAX_LENGTH);

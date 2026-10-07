import {
  NICKNAME_MAX_LENGTH,
  PROFILE_BIO_MAX_LENGTH,
} from '../constants/profile';

export const limitNickname = (value: string) =>
  value.slice(0, NICKNAME_MAX_LENGTH);

export const limitProfileBio = (value: string) =>
  value.slice(0, PROFILE_BIO_MAX_LENGTH);

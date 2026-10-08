import { queryOptions } from '@tanstack/react-query';
import { isHTTPError } from 'ky';

import { apiClient } from '../api-client';
import { END_POINT } from '../end-point';
import { USER_QUERY_KEY } from '../query-key';
import type { GetUserProfileResponse, UserPublicProfile } from './type';

interface OrderedTag {
  id: number;
  name: string;
}

const isOrderedTagArray = (value: unknown): value is OrderedTag[] => {
  return (
    value === undefined ||
    (Array.isArray(value) &&
      value.every(
        (tag) =>
          typeof tag === 'object' &&
          tag !== null &&
          typeof (tag as OrderedTag).id === 'number' &&
          typeof (tag as OrderedTag).name === 'string',
      ))
  );
};

const toProfileTags = (tags: OrderedTag[] | undefined) => {
  return (tags ?? []).map(({ id, name }) => ({
    id,
    name,
  }));
};

type UserPublicProfileData = NonNullable<GetUserProfileResponse['data']>;
type UserPublicProfileDataWithNickname = UserPublicProfileData & {
  nickname: string;
};

const isNullableString = (value: unknown) => {
  return value === undefined || value === null || typeof value === 'string';
};

const isOptionalBoolean = (value: unknown) =>
  value === undefined || typeof value === 'boolean';

const isValidUserPublicProfileData = (
  data: unknown,
): data is UserPublicProfileDataWithNickname => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const {
    nickname,
    profileImageUrl,
    universityEmailVerified,
    exchangeDocumentVerified,
    representativeTags,
    bio,
    isDeleted,
  } = data as Partial<UserPublicProfileData>;

  return (
    typeof nickname === 'string' &&
    isNullableString(profileImageUrl) &&
    isOptionalBoolean(universityEmailVerified) &&
    isOptionalBoolean(exchangeDocumentVerified) &&
    isOrderedTagArray(representativeTags) &&
    isNullableString(bio) &&
    (isDeleted === undefined || typeof isDeleted === 'boolean')
  );
};

const getUserProfile = async (
  userId: number,
): Promise<UserPublicProfile | null> => {
  let response: GetUserProfileResponse;

  try {
    response = await apiClient
      .get(END_POINT.USER.PROFILE(userId))
      .json<GetUserProfileResponse>();
  } catch (error) {
    if (isHTTPError(error) && error.response.status === 404) {
      return null;
    }

    throw error;
  }

  if (response.success === false) {
    throw new Error(response.message || '프로필을 불러오지 못했습니다.');
  }

  if (!isValidUserPublicProfileData(response.data)) {
    throw new Error('프로필 응답 형식이 올바르지 않습니다.');
  }

  const {
    profileImageUrl,
    nickname,
    universityEmailVerified,
    exchangeDocumentVerified,
    representativeTags,
    bio,
    isDeleted,
  } = response.data;

  return {
    imageUrl: profileImageUrl || null,
    nickname,
    isVerified: universityEmailVerified || exchangeDocumentVerified,
    tags: toProfileTags(representativeTags),
    bio: bio ?? null,
    isWithdrawn: Boolean(isDeleted),
  };
};

export const USER_QUERY_OPTIONS = {
  PROFILE: (userId: number) =>
    queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(userId),
      queryFn: () => getUserProfile(userId),
    }),
};

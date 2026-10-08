'use client';

import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import { validateImageFile } from '@/shared/api/image';
import { formatDateInput } from '@/shared/utils/format-date-input';
import { isValidDate } from '@/shared/utils/is-valid-date';
import { limitNickname, limitProfileBio } from '@/shared/utils/profile-input';
import type { GenderType } from '@/types/gender';

export interface ProfileFormValues {
  nickname: string;
  gender: GenderType | null;
  birthDate: string;
  bio: string;
  profileImageUrl: string | null;
}

const EMPTY_PROFILE_VALUES: ProfileFormValues = {
  nickname: '',
  gender: null,
  birthDate: '',
  bio: '',
  profileImageUrl: null,
};

export const useProfileForm = (
  initialValues: ProfileFormValues = EMPTY_PROFILE_VALUES,
) => {
  const [originalValues] = useState(() => ({ ...initialValues }));
  const [values, setValues] = useState(() => ({
    ...initialValues,
    birthDate: formatDateInput(initialValues.birthDate, '', {
      variant: 'date',
    }),
  }));
  const [isBirthDateTouched, setIsBirthDateTouched] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    file: File;
    previewUrl: string;
  } | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const birthDateError =
    isBirthDateTouched &&
    values.birthDate.trim() &&
    !isValidDate(values.birthDate)
      ? '올바르지 않은 형식입니다.'
      : undefined;

  const handleNicknameChange = (nickname: string) => {
    setValues((previous) => ({
      ...previous,
      nickname: limitNickname(nickname),
    }));
  };

  const handleGenderChange = (gender: GenderType) => {
    setValues((previous) => ({ ...previous, gender }));
  };

  const handleBirthDateChange = (birthDate: string) => {
    setValues((previous) => ({
      ...previous,
      birthDate: formatDateInput(birthDate, previous.birthDate, {
        variant: 'date',
      }),
    }));
  };

  const handleBioChange = (bio: string) => {
    setValues((previous) => ({ ...previous, bio: limitProfileBio(bio) }));
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      validateImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = previewUrl;
      setSelectedImage({ file, previewUrl });
      setImageError(null);
    } catch (error) {
      setImageError(
        error instanceof Error ? error.message : '이미지를 선택하지 못했어요.',
      );
    }
  };

  return {
    ...values,
    initialNickname: originalValues.nickname,
    profileImageFile: selectedImage?.file ?? null,
    profileImagePreviewUrl: selectedImage?.previewUrl ?? values.profileImageUrl,
    imageError,
    birthDateError,
    isValid: Boolean(
      values.nickname.trim() && values.gender && isValidDate(values.birthDate),
    ),
    handleNicknameChange,
    handleGenderChange,
    handleBirthDateChange,
    handleBioChange,
    handleProfileImageChange,
    handleBirthDateBlur: () => setIsBirthDateTouched(true),
  };
};

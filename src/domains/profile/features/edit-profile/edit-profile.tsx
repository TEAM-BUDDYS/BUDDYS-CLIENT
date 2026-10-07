'use client';

import defaultProfileImage from '@/shared/assets/icons/profile.svg';
import {
  Dropdown,
  FormLabel,
  NicknameField,
  ProfileImageInput,
  TextField,
} from '@/shared/components/ui';
import { GENDER_OPTIONS } from '@/shared/constants/gender';
import {
  type ProfileFormValues,
  useProfileForm,
} from '@/shared/hooks/use-profile-form';
import { PROFILE_BIO_MAX_LENGTH } from '@/shared/utils/profile-input';

interface EditProfileProps {
  initialValues?: ProfileFormValues;
}

export const EditProfile = ({ initialValues }: EditProfileProps) => {
  const form = useProfileForm(initialValues);
  const selectedGender =
    GENDER_OPTIONS.find((option) => option.value === form.gender) ?? null;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col items-center gap-3">
        <ProfileImageInput
          accept="image/jpeg,image/png,image/webp"
          alt="프로필 이미지"
          label="프로필 이미지 변경"
          src={form.profileImagePreviewUrl || defaultProfileImage}
          onChange={form.handleProfileImageChange}
        />
        {form.imageError && (
          <p role="alert" className="text-caption-r-12 text-error">
            {form.imageError}
          </p>
        )}
        <p className="text-body-m-15 text-gray-800">
          {form.nickname || '닉네임'}
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <NicknameField
          label="닉네임"
          initialNickname={form.initialNickname}
          value={form.nickname}
          onChange={(event) => form.handleNicknameChange(event.target.value)}
          required
        />
        <div className="flex flex-col gap-2">
          <FormLabel as="h2" required>
            성별
          </FormLabel>
          <Dropdown
            options={GENDER_OPTIONS}
            getOptionLabel={(option) => option.label}
            getOptionKey={(option) => option.value}
            placeholder="성별을 선택해주세요"
            value={selectedGender}
            onChange={(option) => form.handleGenderChange(option.value)}
          />
        </div>
        <TextField
          label="생년월일"
          placeholder="예: 2002.04.04"
          value={form.birthDate}
          onChange={(event) => form.handleBirthDateChange(event.target.value)}
          onBlur={form.handleBirthDateBlur}
          status={form.birthDateError ? 'error' : 'default'}
          message={form.birthDateError}
          inputMode="numeric"
          required
        />
        <TextField
          label="소개"
          placeholder="한 줄로 나를 소개해보세요"
          value={form.bio}
          maxLength={PROFILE_BIO_MAX_LENGTH}
          onChange={(event) => form.handleBioChange(event.target.value)}
        />
      </div>
    </div>
  );
};

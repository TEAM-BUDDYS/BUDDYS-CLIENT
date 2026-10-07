import { type ChangeEvent, useState } from 'react';

import firstProfileImage from '@/shared/assets/icons/profile.svg';
import {
  Dropdown,
  FormLabel,
  NicknameField,
  ProfileImageInput,
  TextField,
} from '@/shared/components/ui';
import {
  GENDER_OPTIONS,
  PROFILE_BIO_MAX_LENGTH,
} from '@/shared/constants/profile';
import type { GenderType } from '@/types/gender';

interface OnboardProfileStepProps {
  nickname: string;
  nicknameError: string | null;
  checkedNickname: string | null;
  isCheckingNickname: boolean;
  gender: GenderType | null;
  birthDate: string;
  bio: string;
  isUploading: boolean;
  profileImagePreviewUrl: string | null;
  imageError: string | null;
  birthDateError: string | undefined;
  onBirthDateBlur: () => void;
  onNicknameChange: (value: string) => void;
  onCheckNicknameDuplicate: () => void;
  onGenderChange: (value: GenderType) => void;
  onBirthDateChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onProfileImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const OnboardProfileStep = ({
  nickname,
  nicknameError,
  checkedNickname,
  isCheckingNickname,
  gender,
  birthDate,
  bio,
  isUploading,
  profileImagePreviewUrl,
  imageError,
  birthDateError,
  onBirthDateBlur,
  onNicknameChange,
  onCheckNicknameDuplicate,
  onGenderChange,
  onBirthDateChange,
  onBioChange,
  onProfileImageChange,
}: OnboardProfileStepProps) => {
  const selectedGenderLabel =
    GENDER_OPTIONS.find((option) => option.value === gender)?.label ?? null;
  const genderLabels = GENDER_OPTIONS.map((option) => option.label);
  const [isBlur, setIsBlur] = useState(false);
  const [currentNickname, setCurrentNickname] = useState('');
  const handleGenderChange = (label: string) => {
    const selectedGender = GENDER_OPTIONS.find(
      (option) => option.label === label,
    );

    if (selectedGender) {
      onGenderChange(selectedGender.value);
    }
  };

  const profileImageSrc = profileImagePreviewUrl ?? firstProfileImage;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-title-b-22 text-gray-800">프로필 등록</h1>
        <div className="flex flex-col items-center gap-3">
          <ProfileImageInput
            accept="image/jpeg,image/png,image/webp"
            alt="프로필 이미지"
            disabled={isUploading}
            label="프로필 이미지 등록"
            src={profileImageSrc}
            onChange={onProfileImageChange}
          />
          {imageError && (
            <p role="alert" className="text-caption-r-12 text-error">
              {imageError}
            </p>
          )}
          <p className="text-body-m-15 text-gray-800">
            {isBlur && currentNickname.length > 0 ? currentNickname : '닉네임'}
          </p>
        </div>
      </div>

      <div className="mb-[59px] flex flex-col gap-7">
        <NicknameField
          label="닉네임"
          initialNickname=""
          checkedNickname={checkedNickname}
          isChecking={isCheckingNickname}
          required
          value={nickname}
          status={nicknameError ? 'error' : 'default'}
          message={nicknameError}
          onCheckDuplicate={onCheckNicknameDuplicate}
          onChange={(event) => onNicknameChange(event.target.value)}
          onBlur={(event) => {
            setCurrentNickname(event.target.value);
            setIsBlur(true);
          }}
          disabled={isUploading}
        />
        <div className="flex flex-col gap-2">
          <FormLabel as="h2" required>
            성별
          </FormLabel>
          <Dropdown
            options={genderLabels}
            placeholder="성별을 선택해주세요"
            value={selectedGenderLabel}
            onChange={handleGenderChange}
          />
        </div>
        <TextField
          label="생년월일"
          placeholder="예: 2002.04.04"
          required
          value={birthDate}
          status={birthDateError ? 'error' : 'default'}
          message={birthDateError}
          onBlur={onBirthDateBlur}
          onChange={(event) => onBirthDateChange(event.target.value)}
        />
        <TextField
          label="소개"
          maxLength={PROFILE_BIO_MAX_LENGTH}
          placeholder="한 줄로 나를 소개해보세요"
          value={bio}
          onChange={(event) => onBioChange(event.target.value)}
        />
      </div>
    </div>
  );
};

import { useEffect, useMemo, useState } from 'react';

import firstProfileImage from '@/shared/assets/icons/profile.svg';
import {
  Dropdown,
  FormLabel,
  ProfileImageInput,
  TextField,
} from '@/shared/components/ui';
import type { GenderType } from '@/types/gender';

import { GENDER_OPTIONS } from './constant';

interface OnboardProfileStepProps {
  nickname: string;
  nicknameError: string | null;
  gender: GenderType | null;
  birthDate: string;
  bio: string;
  isUploading: boolean;
  profileImageFile: File | null;
  onNicknameChange: (value: string) => void;
  onGenderChange: (value: GenderType) => void;
  onBirthDateChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onProfileImageChange: (file: File | null) => void;
}

export const OnboardProfileStep = ({
  nickname,
  nicknameError,
  gender,
  birthDate,
  bio,
  isUploading,
  profileImageFile,
  onNicknameChange,
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

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onProfileImageChange(event.target.files?.[0] ?? null);
  };

  const profileImagePreviewUrl = useMemo(() => {
    if (!profileImageFile) {
      return null;
    }

    return URL.createObjectURL(profileImageFile);
  }, [profileImageFile]);

  useEffect(() => {
    return () => {
      if (profileImagePreviewUrl) {
        URL.revokeObjectURL(profileImagePreviewUrl);
      }
    };
  }, [profileImagePreviewUrl]);

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
            onChange={handleProfileImageChange}
          />
          <p className="text-body-m-15 text-gray-800">
            {isBlur && currentNickname.length > 0 ? currentNickname : '닉네임'}
          </p>
        </div>
      </div>

      <div className="mb-[59px] flex flex-col gap-7">
        <TextField
          label="닉네임"
          maxLength={8}
          placeholder="닉네임을 입력하세요"
          required
          value={nickname}
          status={nicknameError ? 'error' : 'default'}
          message={nicknameError}
          onChange={(event) => onNicknameChange(event.target.value)}
          onBlur={(event) => {
            setCurrentNickname(event.target.value);
            setIsBlur(true);
          }}
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
          onChange={(event) => onBirthDateChange(event.target.value)}
        />
        <TextField
          label="소개"
          maxLength={30}
          placeholder="한 줄로 나를 소개해보세요"
          value={bio}
          onChange={(event) => onBioChange(event.target.value)}
        />
      </div>
    </div>
  );
};

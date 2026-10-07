'use client';

import { useSuspenseQueries } from '@tanstack/react-query';
import { useState } from 'react';

import { TAG_QUERY_OPTIONS, useNicknameCheck } from '@/shared/api';
import defaultProfileImage from '@/shared/assets/icons/profile.svg';
import {
  Button,
  Dropdown,
  FormLabel,
  Modal,
  NicknameField,
  ProfileImageInput,
  TextField,
} from '@/shared/components/ui';
import {
  GENDER_OPTIONS,
  PROFILE_BIO_MAX_LENGTH,
} from '@/shared/constants/profile';
import {
  type ProfileFormValues,
  useProfileForm,
} from '@/shared/hooks/use-profile-form';

import type { SelectedTag } from '../../model/tag-edit';
import { TagEditSection } from '../../sections/tag-edit-section';

interface EditProfileProps {
  initialValues?: ProfileFormValues;
}

export const EditProfile = ({ initialValues }: EditProfileProps) => {
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);
  const [activityQuery, interestQuery, travelStyleQuery] = useSuspenseQueries({
    queries: [
      TAG_QUERY_OPTIONS.LIST('ACTIVITY'),
      TAG_QUERY_OPTIONS.LIST('INTEREST'),
      TAG_QUERY_OPTIONS.LIST('TRAVEL_STYLE'),
    ],
  });
  const form = useProfileForm(initialValues);

  const {
    checkedNickname,
    nicknameError,
    isCheckingNickname,
    checkNickname,
    resetNicknameCheck,
  } = useNicknameCheck();
  const [isNicknameCheckModalOpen, setIsNicknameCheckModalOpen] =
    useState(false);
  const isNicknameValid =
    form.nickname === form.initialNickname || checkedNickname === form.nickname;
  const selectedGender =
    GENDER_OPTIONS.find((option) => option.value === form.gender) ?? null;

  const handleSaveClick = () => {
    if (!form.isValid || isCheckingNickname) return;

    if (!isNicknameValid) {
      setIsNicknameCheckModalOpen(true);
      return;
    }
  };

  return (
    <div className="mb-5.5 flex flex-col gap-11.75">
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
          checkedNickname={checkedNickname}
          isChecking={isCheckingNickname}
          status={nicknameError ? 'error' : 'default'}
          message={nicknameError}
          onChange={(event) => {
            resetNicknameCheck();
            form.handleNicknameChange(event.target.value);
          }}
          onCheckDuplicate={() => {
            void checkNickname(form.nickname);
          }}
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
        <TagEditSection
          tagOptions={{
            ACTIVITY: activityQuery.data,
            INTEREST: interestQuery.data,
            TRAVEL_STYLE: travelStyleQuery.data,
          }}
          selectedTags={selectedTags}
          onChange={setSelectedTags}
        />
      </div>
      <Button
        disabled={!form.isValid || isCheckingNickname}
        onClick={handleSaveClick}
      >
        저장
      </Button>
      <Modal
        type="alert"
        buttonVariant="primary"
        cancelLabel="확인"
        open={isNicknameCheckModalOpen}
        title="닉네임 중복확인 안내"
        description="중복확인 후 다시 시도해 주세요."
        onClose={() => setIsNicknameCheckModalOpen(false)}
      />
    </div>
  );
};

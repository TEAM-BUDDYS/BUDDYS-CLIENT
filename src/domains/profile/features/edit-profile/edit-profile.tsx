'use client';

import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  COURSE_QUERY_KEY,
  POST_QUERY_KEY,
  TAG_QUERY_OPTIONS,
  useNicknameCheck,
  USER_QUERY_KEY,
} from '@/shared/api';
import { useImageUpload } from '@/shared/api/image';
import defaultProfileImage from '@/shared/assets/icons/profile.svg';
import {
  Button,
  Dropdown,
  FormLabel,
  Modal,
  NicknameField,
  ProfileImageInput,
  TextField,
  useToast,
} from '@/shared/components/ui';
import {
  GENDER_OPTIONS,
  PROFILE_BIO_MAX_LENGTH,
} from '@/shared/constants/profile';
import { useProfileForm } from '@/shared/hooks/use-profile-form';

import {
  PROFILE_MUTATION_OPTIONS,
  PROFILE_QUERY_OPTIONS,
} from '../../api/query';
import type { GetMyProfileForEditResponse } from '../../api/type';
import { type SelectedTag, TAG_EDIT_GROUPS } from '../../model/tag-edit';
import { TagEditSection } from '../../sections/tag-edit-section';

export const EditProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { uploadImage } = useImageUpload();
  const updateProfileMutation = useMutation(PROFILE_MUTATION_OPTIONS.UPDATE());
  const [isSaving, setIsSaving] = useState(false);
  const [profileQuery, activityQuery, interestQuery, travelStyleQuery] =
    useSuspenseQueries({
      queries: [
        {
          ...PROFILE_QUERY_OPTIONS.ME_EDIT(),
          select: (response: GetMyProfileForEditResponse) => {
            if (!response.data) {
              throw new Error('프로필 편집 정보가 없습니다.');
            }

            return response.data;
          },
        },
        TAG_QUERY_OPTIONS.LIST('ACTIVITY'),
        TAG_QUERY_OPTIONS.LIST('INTEREST'),
        TAG_QUERY_OPTIONS.LIST('TRAVEL_STYLE'),
      ],
    });
  const profile = profileQuery.data;
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>(
    profile.orderedTags,
  );
  const form = useProfileForm({
    nickname: profile.nickname,
    gender: profile.gender,
    birthDate: profile.birthDate,
    bio: profile.bio ?? '',
    profileImageUrl: profile.profileImageUrl,
  });

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

  const isTagSelectionValid = TAG_EDIT_GROUPS.every((group) => {
    const count = selectedTags.filter(
      (tag) => tag.tagType === group.tagType,
    ).length;
    return count >= group.minSelectionCount && count <= group.maxSelectionCount;
  });

  const handleSaveClick = async () => {
    if (
      !form.isValid ||
      !form.gender ||
      !isTagSelectionValid ||
      isCheckingNickname ||
      isSaving
    )
      return;

    if (!isNicknameValid) {
      setIsNicknameCheckModalOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      const profileImageUrl = form.profileImageFile
        ? await uploadImage({
            file: form.profileImageFile,
            imageDomain: 'PROFILE',
          })
        : form.profileImageUrl;

      await updateProfileMutation.mutateAsync({
        nickname: form.nickname,
        gender: form.gender,
        birthDate: form.birthDate.replaceAll('.', '-'),
        bio: form.bio === '' ? null : form.bio,
        profileImageUrl,
        orderedTagIds: selectedTags.map((tag) => tag.id),
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.ME() }),
        queryClient.invalidateQueries({ queryKey: POST_QUERY_KEY.ALL }),
        queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY.ALL }),
      ]);
      showToast('프로필을 수정했어요.');
      router.back();
    } catch {
      showToast('프로필을 수정하지 못했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mb-5.5 flex flex-col gap-11.75">
      <fieldset disabled={isSaving} className="flex min-w-0 flex-col gap-7">
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
        </div>
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
      </fieldset>
      <Button
        disabled={
          !form.isValid ||
          !isTagSelectionValid ||
          isCheckingNickname ||
          isSaving
        }
        onClick={handleSaveClick}
      >
        {isSaving ? '저장 중...' : '저장'}
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

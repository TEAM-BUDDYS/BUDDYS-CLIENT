import type { ChangeEvent } from 'react';

import { TextField, type TextFieldProps } from '@/shared/components/ui';

import { NicknameCheckButton } from '../nickname-check-button/nickname-check-button';

interface ProfileNicknameFieldProps extends Pick<
  TextFieldProps,
  'label' | 'message' | 'status' | 'disabled'
> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  initialNickname: string;
  onCheckDuplicate: () => void;
  isChecking?: boolean;
  checkedNickname?: string | null;
}

const DUPLICATE_CHECK_SUCCESS_MESSAGE = '사용 가능한 닉네임입니다.';
const NICKNAME_MAX_LENGTH = 14;

export const ProfileNicknameField = ({
  value,
  onChange,
  initialNickname,
  onCheckDuplicate,
  isChecking = false,
  checkedNickname = null,
  label,
  message,
  status,
  disabled,
}: ProfileNicknameFieldProps) => {
  const isNicknameUnchanged = value === initialNickname;
  const trimmedLength = value.trim().length;
  const isDuplicateChecked =
    checkedNickname !== null && checkedNickname === value;
  const isCheckButtonDisabled =
    disabled ||
    trimmedLength === 0 ||
    trimmedLength > NICKNAME_MAX_LENGTH ||
    isNicknameUnchanged ||
    isChecking ||
    isDuplicateChecked;
  const showDuplicateCheckSuccessMessage =
    isDuplicateChecked && !isNicknameUnchanged;

  return (
    <TextField
      className="pr-24"
      disabled={disabled}
      label={label}
      maxLength={NICKNAME_MAX_LENGTH}
      message={
        showDuplicateCheckSuccessMessage
          ? DUPLICATE_CHECK_SUCCESS_MESSAGE
          : message
      }
      placeholder="닉네임을 입력하세요"
      status={showDuplicateCheckSuccessMessage ? 'success' : status}
      suffix={
        <NicknameCheckButton
          aria-label="닉네임 중복 확인"
          disabled={isCheckButtonDisabled}
          isLoading={isChecking}
          onClick={onCheckDuplicate}
        />
      }
      value={value}
      onChange={onChange}
    />
  );
};

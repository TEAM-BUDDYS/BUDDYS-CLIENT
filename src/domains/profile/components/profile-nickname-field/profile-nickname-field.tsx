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
  isDuplicateChecked?: boolean;
}

const DUPLICATE_CHECK_SUCCESS_MESSAGE = '사용 가능한 닉네임입니다.';

export const ProfileNicknameField = ({
  value,
  onChange,
  initialNickname,
  onCheckDuplicate,
  isChecking = false,
  isDuplicateChecked = false,
  label,
  message,
  status,
  disabled,
}: ProfileNicknameFieldProps) => {
  const isNicknameUnchanged = value === initialNickname;
  const isCheckButtonDisabled =
    disabled ||
    value.length === 0 ||
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

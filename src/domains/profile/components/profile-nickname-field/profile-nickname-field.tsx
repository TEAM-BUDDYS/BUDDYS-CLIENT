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

const DUPLICATE_CHECK_SUCCESS_MESSAGE = '사용 가능한 닉네임이에요';

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
  // 값을 바꾸지 않았다면 검증 자체가 필요 없는 상태이므로,
  // isDuplicateChecked가 true여도 통과 문구를 띄우지 않습니다.
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

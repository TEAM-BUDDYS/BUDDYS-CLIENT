'use client';

import { useState } from 'react';

import { TextField } from '@/shared/components/ui';

interface EmailInputStepProps {
  email: string;
  onEmailChange: (email: string) => void;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EmailInputStep = ({
  email,
  onEmailChange,
}: EmailInputStepProps) => {
  const [hasValidated, setHasValidated] = useState(false);
  const hasEmail = email.trim().length > 0;
  const isValidEmail = EMAIL_PATTERN.test(email.trim());
  const shouldShowValidation = hasValidated && hasEmail;

  const status = shouldShowValidation
    ? isValidEmail
      ? 'success'
      : 'error'
    : 'default';

  const message = shouldShowValidation
    ? isValidEmail
      ? undefined
      : '올바른 이메일 형식으로 입력해주세요.'
    : undefined;

  return (
    <TextField
      label="학교 이메일"
      message={message}
      placeholder="예) example@university.edu"
      required
      status={status}
      type="email"
      value={email}
      onBlur={() => setHasValidated(true)}
      onChange={(event) => {
        setHasValidated(false);
        onEmailChange(event.target.value);
      }}
    />
  );
};

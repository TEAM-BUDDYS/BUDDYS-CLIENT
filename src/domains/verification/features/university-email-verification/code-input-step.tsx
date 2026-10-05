'use client';

import { TextField } from '@/shared/components/ui';

interface CodeInputStepProps {
  code: string;
  onCodeChange: (code: string) => void;
}

export const CodeInputStep = ({ code, onCodeChange }: CodeInputStepProps) => {
  return (
    <TextField
      label="인증번호"
      placeholder="예) BE2A4F"
      maxLength={6}
      value={code}
      onChange={(event) => onCodeChange(event.target.value.toUpperCase())}
    />
  );
};

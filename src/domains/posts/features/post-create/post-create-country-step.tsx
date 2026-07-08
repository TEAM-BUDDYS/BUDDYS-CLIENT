'use client';

// TODO: COUNTRY_OPTIONS 삭제 후 서버 응답값으로 변경
import { COUNTRY_OPTIONS } from '@/domains/posts/features/post-create/constants';
import { Dropdown } from '@/shared/components/ui';

interface PostCreateCountryStepProps {
  value: string;
  onChange: (value: string) => void;
}

export const PostCreateCountryStep = ({
  value,
  onChange,
}: PostCreateCountryStepProps) => {
  return (
    <Dropdown
      options={COUNTRY_OPTIONS}
      placeholder="국가를 선택해주세요"
      value={value}
      onChange={onChange}
    />
  );
};

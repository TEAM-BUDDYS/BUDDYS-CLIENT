'use client';

import { Dropdown } from '@/shared/components/ui';

import type { LocationOption } from './model';

interface PostCreateCountryStepProps {
  options: LocationOption[];
  value: LocationOption | null;
  hasMore: boolean;
  isLoadingMore: boolean;
  onChange: (value: LocationOption) => void;
  onLoadMore: () => void;
}

export const PostCreateCountryStep = ({
  options,
  value,
  hasMore,
  isLoadingMore,
  onChange,
  onLoadMore,
}: PostCreateCountryStepProps) => {
  return (
    <Dropdown
      options={options}
      placeholder="국가를 선택해주세요"
      value={value}
      hasMore={hasMore}
      isLoadingMore={isLoadingMore}
      getOptionLabel={(country) => country.name}
      getOptionKey={(country) => country.id}
      onChange={onChange}
      onLoadMore={onLoadMore}
    />
  );
};

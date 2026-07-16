'use client';

import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

import { SearchIcon, XCircleIcon } from '../../icons';

export type SearchbarSize = 'small' | 'medium';

interface SearchbarProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'size' | 'value' | 'onChange'
> {
  size: SearchbarSize;
  value: string;
  isCompleted?: boolean;
  searchIconClassName?: string;
  onChange: (value: string) => void;
}

const searchbarStyle = {
  small: 'h-11',
  medium: 'h-13',
} as const;

export const Searchbar = ({
  size,
  value,
  isCompleted = false,
  searchIconClassName,
  onChange,
  placeholder = '검색어를 입력해주세요',
  ...inputProps
}: SearchbarProps) => {
  const { className: inputClassName, ...restInputProps } = inputProps ?? {};

  const showClearButton = value.length > 0 && !isCompleted;

  return (
    <div
      className={`flex ${searchbarStyle[size]} w-full items-center justify-between rounded-xl bg-gray-50 py-2.5 pr-3 pl-4`}
    >
      <input
        {...restInputProps}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'text-body-m-16 min-w-0 flex-1 bg-transparent text-gray-800 outline-none placeholder:text-gray-500',
          inputClassName,
        )}
      />
      {showClearButton ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="검색어 삭제"
        >
          <XCircleIcon className="size-6 shrink-0 text-gray-200" />
        </button>
      ) : (
        <SearchIcon
          className={cn('size-6 shrink-0 text-gray-500', searchIconClassName)}
        />
      )}
    </div>
  );
};

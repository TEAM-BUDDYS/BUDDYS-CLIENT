'use client';

import { SearchIcon, XCircleIcon } from '../../icons';

export type SearchbarSize = 'small' | 'medium';

interface SearchbarProps {
  size: SearchbarSize;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const searchbarStyle = {
  small: 'h-11 w-76.75',
  medium: 'h-13 w-85.75',
} as const;

export const Searchbar = ({
  size,
  value,
  onChange,
  placeholder = '검색어를 입력해주세요',
}: SearchbarProps) => {
  const isTyping = value.length > 0;

  const handleClear = () => {
    onChange('');
  };

  return (
    <div
      className={`flex ${searchbarStyle[size]} items-center justify-between rounded-xl bg-gray-50 py-2.5 pr-3 pl-4`}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-body-m-15 flex-1 bg-transparent text-gray-800 outline-none placeholder:text-gray-500"
      />
      {isTyping ? (
        <button type="button" onClick={handleClear} aria-label="검색어 삭제">
          <XCircleIcon
            className="shrink-0 text-gray-200"
            width={24}
            height={24}
          />
        </button>
      ) : (
        <SearchIcon className="shrink-0 text-gray-500" width={24} height={24} />
      )}
    </div>
  );
};

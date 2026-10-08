'use client';

import { ClockIcon, XIcon } from '@/shared/components/icons';

export interface SearchHistoryItem {
  id: string;
  keyword: string;
}

interface SearchHistoryProps {
  items: SearchHistoryItem[];
  onSelect: (item: SearchHistoryItem) => void;
  onDelete: (id: string) => void;
}

export const SearchHistory = ({
  items,
  onSelect,
  onDelete,
}: SearchHistoryProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex h-11 w-full items-center rounded-lg active:bg-gray-50"
        >
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="flex h-full min-w-0 flex-1 items-center gap-2.5 text-left"
          >
            <ClockIcon className="size-5 shrink-0 text-gray-200" />
            <span className="text-body-m-16 truncate text-gray-800">
              {item.keyword}
            </span>
          </button>

          <button
            type="button"
            aria-label={`${item.keyword} 검색 기록 삭제`}
            onClick={() => onDelete(item.id)}
            className="size-6 shrink-0 text-gray-500"
          >
            <XIcon className="size-4" />
          </button>
        </li>
      ))}
    </ul>
  );
};

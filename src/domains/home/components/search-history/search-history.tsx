'use client';

import { cn } from '@/lib/cn';
import { ClockIcon, SearchIcon, XIcon } from '@/shared/components/icons';

export interface SearchHistoryItem {
  id: string;
  keyword: string;
}

interface BaseSearchHistoryProps {
  items: SearchHistoryItem[];
  onSelect: (item: SearchHistoryItem) => void;
}

interface HistorySearchHistoryProps extends BaseSearchHistoryProps {
  type: 'history';
  onDelete: (id: string) => void;
}

interface SuggestionSearchHistoryProps extends BaseSearchHistoryProps {
  type: 'suggestion';
  onDelete?: never;
}

type SearchHistoryProps =
  | HistorySearchHistoryProps
  | SuggestionSearchHistoryProps;

export const SearchHistory = ({
  items,
  type,
  onSelect,
  onDelete,
}: SearchHistoryProps) => {
  const LeadingIcon = type === 'history' ? ClockIcon : SearchIcon;

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => {
        return (
          <li
            key={item.id}
            className={cn(
              'flex h-11 w-full items-center rounded-lg active:bg-gray-50',
              type === 'suggestion' && 'px-2',
            )}
          >
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="flex h-full min-w-0 flex-1 items-center gap-2 text-left"
            >
              <LeadingIcon className="size-4 shrink-0 text-gray-200" />
              <span className="text-body-m-15 truncate text-gray-800">
                {item.keyword}
              </span>
            </button>

            {type === 'history' && (
              <button
                type="button"
                aria-label={`${item.keyword} 검색 기록 삭제`}
                onClick={() => onDelete(item.id)}
                className="size-6 shrink-0 text-gray-800"
              >
                <XIcon className="size-6" />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

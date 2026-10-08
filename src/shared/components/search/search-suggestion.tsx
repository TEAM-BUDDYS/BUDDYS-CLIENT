'use client';

import { ClockIcon } from '@/shared/components/icons';

interface SearchSuggestionItem {
  keyword: string;
  isRecentSearch: boolean;
}

interface SearchSuggestionsProps {
  items: SearchSuggestionItem[];
  searchKeyword: string;
  onSelect: (keyword: string) => void;
}

export const SearchSuggestion = ({
  items,
  searchKeyword,
  onSelect,
}: SearchSuggestionsProps) => {
  const query = searchKeyword.trim();

  return (
    <ul className="flex flex-col gap-2">
      {items.map(({ keyword, isRecentSearch }) => {
        const matchIndex = query ? keyword.indexOf(query) : -1;
        const matchEnd = matchIndex + query.length;

        return (
          <li key={keyword}>
            <button
              type="button"
              className="flex h-11 w-full items-center gap-3 rounded-lg text-left active:bg-gray-50"
              onClick={() => onSelect(keyword)}
            >
              <span className="text-body-m-15 min-w-0 flex-1 truncate text-gray-800">
                {matchIndex === -1 ? (
                  keyword
                ) : (
                  <>
                    {keyword.slice(0, matchIndex)}
                    <mark className="text-mint-300 bg-transparent">
                      {keyword.slice(matchIndex, matchEnd)}
                    </mark>
                    {keyword.slice(matchEnd)}
                  </>
                )}
              </span>

              {isRecentSearch ? (
                <ClockIcon
                  aria-hidden
                  className="size-4 shrink-0 text-gray-500"
                />
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

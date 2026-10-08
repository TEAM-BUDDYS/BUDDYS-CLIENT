'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { SEARCH_QUERY_OPTIONS } from '@/shared/api/search/query';
import type { SearchHistoryItem } from '@/shared/components/search/search-history';
import { ROUTES } from '@/shared/config';

import { useDebouncedValue } from './use-debounced-value';

const SEARCH_HISTORY_STORAGE_KEY = 'buddys-search-history';
const SEARCH_HISTORY_LIMIT = 10;

const createSearchHistoryItem = (keyword: string): SearchHistoryItem => {
  return {
    id: keyword,
    keyword,
  };
};

const parseSearchHistoryItems = (value: string | null) => {
  if (!value) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter((keyword): keyword is string => typeof keyword === 'string')
      .map((keyword) => keyword.trim())
      .filter(Boolean)
      .slice(0, SEARCH_HISTORY_LIMIT)
      .map(createSearchHistoryItem);
  } catch {
    return [];
  }
};

const saveSearchHistoryItems = (items: SearchHistoryItem[]) => {
  try {
    localStorage.setItem(
      SEARCH_HISTORY_STORAGE_KEY,
      JSON.stringify(items.map((item) => item.keyword)),
    );
  } catch {
    return;
  }
};

const getInitialSearchHistoryItems = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    return parseSearchHistoryItems(
      localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY),
    );
  } catch {
    return [];
  }
};

export const useSearchSheet = (onClose?: () => void, initialKeyword = '') => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
  const [searchHistoryItems, setSearchHistoryItems] = useState<
    SearchHistoryItem[]
  >(getInitialSearchHistoryItems);

  const trimmedKeyword = searchKeyword.trim();
  const debouncedKeyword = useDebouncedValue(trimmedKeyword, 300);
  const isSuggestionMode = Boolean(trimmedKeyword);
  const isDebouncing = trimmedKeyword !== debouncedKeyword;
  const suggestionsQuery = useQuery({
    ...SEARCH_QUERY_OPTIONS.SUGGESTIONS({ keyword: debouncedKeyword, size: 8 }),
    enabled: isSuggestionMode && !isDebouncing,
  });
  const recentKeywordOrder = new Map(
    searchHistoryItems.map((item, index) => [item.keyword, index]),
  );
  const suggestionItems = Array.from(
    new Set(
      (isDebouncing ? [] : (suggestionsQuery.data ?? []))
        .map((item) => item.keyword.trim())
        .filter(Boolean),
    ),
    (keyword) => ({ keyword, isRecentSearch: recentKeywordOrder.has(keyword) }),
  ).sort(
    (a, b) =>
      (recentKeywordOrder.get(a.keyword) ?? searchHistoryItems.length) -
      (recentKeywordOrder.get(b.keyword) ?? searchHistoryItems.length),
  );

  const saveSearchKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      return null;
    }

    const nextSearchHistoryItems = [
      createSearchHistoryItem(trimmedKeyword),
      ...searchHistoryItems.filter((item) => item.keyword !== trimmedKeyword),
    ].slice(0, SEARCH_HISTORY_LIMIT);

    setSearchHistoryItems(nextSearchHistoryItems);
    saveSearchHistoryItems(nextSearchHistoryItems);

    return trimmedKeyword;
  };

  const routeToSearchResult = (keyword: string) => {
    const searchParams = new URLSearchParams({ keyword });
    const href = `${ROUTES.SEARCH}?${searchParams.toString()}`;

    onClose?.();

    if (pathname === ROUTES.SEARCH) {
      router.replace(href);
      return;
    }

    router.push(href);
  };

  const handleSearchSubmit = (keyword = searchKeyword) => {
    const savedKeyword = saveSearchKeyword(keyword);

    if (!savedKeyword) {
      return;
    }

    routeToSearchResult(savedKeyword);
  };

  const handleSearchHistorySelect = (item: SearchHistoryItem) => {
    handleSearchSubmit(item.keyword);
  };

  const handleSearchHistoryDelete = (id: string) => {
    const nextSearchHistoryItems = searchHistoryItems.filter(
      (item) => item.id !== id,
    );

    setSearchHistoryItems(nextSearchHistoryItems);
    saveSearchHistoryItems(nextSearchHistoryItems);
  };

  return {
    searchKeyword,
    searchHistoryItems,
    isSuggestionMode,
    suggestionItems,
    isSuggestionsLoading:
      isSuggestionMode && (isDebouncing || suggestionsQuery.isPending),
    hasSuggestionsError: !isDebouncing && suggestionsQuery.isError,
    retrySuggestions: suggestionsQuery.refetch,
    handleSearchKeywordChange: setSearchKeyword,
    handleSearchSubmit,
    handleSearchHistorySelect,
    handleSearchHistoryDelete,
  };
};

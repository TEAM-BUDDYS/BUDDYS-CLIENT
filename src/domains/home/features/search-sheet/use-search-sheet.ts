'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import type { SearchHistoryItem } from '@/domains/home/components/search-history/search-history';
import { ROUTES } from '@/shared/config';

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
  localStorage.setItem(
    SEARCH_HISTORY_STORAGE_KEY,
    JSON.stringify(items.map((item) => item.keyword)),
  );
};

const getInitialSearchHistoryItems = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  return parseSearchHistoryItems(
    localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY),
  );
};

export const useSearchSheet = (onClose?: () => void, initialKeyword = '') => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
  const [searchHistoryItems, setSearchHistoryItems] = useState<
    SearchHistoryItem[]
  >(getInitialSearchHistoryItems);

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

  const routeToCustomizedExplore = (keyword: string) => {
    const searchParams = new URLSearchParams({ keyword });
    const href = `${ROUTES.CUSTOMIZED_EXPLORE}?${searchParams.toString()}`;

    onClose?.();

    if (pathname === ROUTES.CUSTOMIZED_EXPLORE) {
      router.replace(href);
      return;
    }

    router.push(href);
  };

  const handleSearchSubmit = () => {
    const savedKeyword = saveSearchKeyword(searchKeyword);

    if (!savedKeyword) {
      return;
    }

    routeToCustomizedExplore(savedKeyword);
  };

  const handleSearchHistorySelect = (item: SearchHistoryItem) => {
    const savedKeyword = saveSearchKeyword(item.keyword);

    if (!savedKeyword) {
      return;
    }

    routeToCustomizedExplore(savedKeyword);
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
    handleSearchKeywordChange: setSearchKeyword,
    handleSearchSubmit,
    handleSearchHistorySelect,
    handleSearchHistoryDelete,
  };
};

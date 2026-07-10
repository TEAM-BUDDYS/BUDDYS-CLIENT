'use client';

import { useEffect, useState } from 'react';

import type { SearchHistoryItem } from '@/domains/home/components/search-history/search-history';

const initialSearchHistoryItems: SearchHistoryItem[] = [
  { id: '1', keyword: '파리 동행' },
  { id: '2', keyword: '베를린 맛집' },
  { id: '3', keyword: '루브르 박물관' },
];

const relatedSearchItems: SearchHistoryItem[] = [
  { id: '1', keyword: '파리 동행 구해요' },
  { id: '2', keyword: '파리 맛집 동행' },
  { id: '3', keyword: '파리 여행 동행' },
  { id: '4', keyword: '파리 박물관 동행' },
  { id: '5', keyword: '베를린 맛집 추천' },
  { id: '6', keyword: '루브르 박물관 동행' },
];

export const useSearchSheet = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchHistoryItems, setSearchHistoryItems] = useState(
    initialSearchHistoryItems,
  );
  const [suggestionItems, setSuggestionItems] = useState<SearchHistoryItem[]>(
    [],
  );

  const hasSearchKeyword = searchKeyword.trim().length > 0;
  const searchHistoryTitle = hasSearchKeyword ? '연관 검색어' : '최근 검색';
  const searchHistoryType = hasSearchKeyword ? 'suggestion' : 'history';

  useEffect(() => {
    const trimmedSearchKeyword = searchKeyword.trim();

    const timer = setTimeout(() => {
      if (!trimmedSearchKeyword) {
        setSuggestionItems([]);
        return;
      }

      setSuggestionItems(
        relatedSearchItems.filter((item) =>
          item.keyword.includes(trimmedSearchKeyword),
        ),
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  const handleSearchHistorySelect = (item: SearchHistoryItem) => {
    setSearchKeyword(item.keyword);
  };

  const handleSearchHistoryDelete = (id: string) => {
    setSearchHistoryItems((prevSearchHistoryItems) =>
      prevSearchHistoryItems.filter((item) => item.id !== id),
    );
  };

  return {
    searchKeyword,
    searchHistoryItems,
    suggestionItems,
    searchHistoryTitle,
    searchHistoryType,
    handleSearchKeywordChange: setSearchKeyword,
    handleSearchHistorySelect,
    handleSearchHistoryDelete,
  };
};

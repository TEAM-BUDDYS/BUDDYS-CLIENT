'use client';

import { ListToolbar } from '@/domains/home/components/list-toolbar/list-toolbar';
import { SearchBuddys } from '@/domains/home/components/search-buddys/search-buddys';

// TODO: 버디 검색 API 연동 시 응답 데이터로 교체
const MOCK_SEARCH_BUDDIES = [
  {
    userId: 1,
    nickname: '파리의여행자',
    profileImageUrl: 'https://picsum.photos/seed/search-buddy-1/100/100',
  },
  {
    userId: 2,
    nickname: '바르셀로나버디',
    profileImageUrl: null,
  },
  {
    userId: 3,
    nickname: '런던교환학생',
    profileImageUrl: 'https://picsum.photos/seed/search-buddy-3/100/100',
  },
];

export const SearchResultBuddyList = () => {
  // TODO: 채팅방 생성 API 연동 시 채팅 화면으로 이동
  const handleChatClick = () => {};

  return (
    <>
      <ListToolbar count={MOCK_SEARCH_BUDDIES.length} />

      <div className="mt-4 flex flex-col gap-3.5">
        {MOCK_SEARCH_BUDDIES.map(({ userId, ...buddy }) => (
          <SearchBuddys key={userId} {...buddy} onChatClick={handleChatClick} />
        ))}
      </div>
    </>
  );
};

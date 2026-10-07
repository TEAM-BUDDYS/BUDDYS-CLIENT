'use client';

import { useState } from 'react';

import { MagazineListCard } from '@/domains/home/components/magazine-list-card/magazine-list-card';

// TODO: 저장한 매거진 목록 API 연동 시 응답 데이터로 교체
const MOCK_SAVED_MAGAZINES = [
  {
    magazineId: 1,
    title: '유럽 교환학생이라면 루프트한자 학생 혜택부터!',
    summary: '유럽 교환학생을 준비하고 있다면 꼭 확인해야 할 혜택을 소개해요.',
    thumbnailImageUrl: 'https://picsum.photos/seed/magazine-1/200/200',
    publishedAt: '2026-08-20',
    externalUrl: 'https://www.instagram.com/p/ABC123/',
    isBookmarked: true,
  },
  {
    magazineId: 2,
    title: '교환학생 첫 달 생활비, 이렇게 아껴보세요',
    summary: '현지 교통 패스부터 장보기 팁까지 한 번에 정리했어요.',
    thumbnailImageUrl: 'https://picsum.photos/seed/magazine-2/200/200',
    publishedAt: '2026-10-03',
    externalUrl: 'https://www.instagram.com/p/DEF456/',
    isBookmarked: true,
  },
];

export const SavedMagazineList = () => {
  const [magazines, setMagazines] = useState(MOCK_SAVED_MAGAZINES);

  const handleBookmarkClick = (magazineId: number) => {
    setMagazines((prevMagazines) =>
      prevMagazines.map((magazine) =>
        magazine.magazineId === magazineId
          ? { ...magazine, isBookmarked: !magazine.isBookmarked }
          : magazine,
      ),
    );
  };

  return (
    <ul className="flex flex-col gap-5">
      {magazines.map(({ magazineId, ...magazine }) => (
        <li key={magazineId}>
          <MagazineListCard
            {...magazine}
            onBookmarkClick={() => handleBookmarkClick(magazineId)}
          />
        </li>
      ))}
    </ul>
  );
};

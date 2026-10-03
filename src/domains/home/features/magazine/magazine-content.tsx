'use client';

import { useState } from 'react';

import { ListToolbar } from '@/domains/home/components/list-toolbar/list-toolbar';
import { MagazineListCard } from '@/domains/home/components/magazine-list-card/magazine-list-card';
import {
  type MagazineCategory,
  magazineCategoryItems,
} from '@/domains/home/model/magazine-category';
import { Filter } from '@/shared/components/ui';

// TODO: 매거진 목록 API 연동 시 응답 데이터로 교체
const MOCK_MAGAZINES = [
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
    isBookmarked: false,
  },
];

export const MagazineContent = () => {
  const [category, setCategory] = useState<MagazineCategory>('SUPPORT');
  const [sort, setSort] = useState('최신순');
  const [magazines, setMagazines] = useState(MOCK_MAGAZINES);

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
    <main className="px-4 pt-4 pb-6">
      <div className="flex gap-2">
        {magazineCategoryItems.map((categoryItem) => (
          <Filter
            key={categoryItem.key}
            label={categoryItem.label}
            pressed={category === categoryItem.key}
            onPress={() => setCategory(categoryItem.key)}
          />
        ))}
      </div>

      <div className="mt-6">
        <ListToolbar count={magazines.length} value={sort} onChange={setSort} />
      </div>

      <ul className="mt-4 flex flex-col gap-5">
        {magazines.map(({ magazineId, ...magazine }) => (
          <li key={magazineId}>
            <MagazineListCard
              {...magazine}
              onBookmarkClick={() => handleBookmarkClick(magazineId)}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};

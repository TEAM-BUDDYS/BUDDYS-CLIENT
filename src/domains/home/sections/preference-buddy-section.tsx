'use client';

import { useState } from 'react';

import { SectionHeader } from '@/domains/home/components/section-header/section-header';

const preferenceTags = [
  { id: 1, name: '여행' },
  { id: 2, name: '맛집 탐방' },
  { id: 3, name: '언어교환' },
  { id: 4, name: '생활 도움' },
  { id: 5, name: '공부' },
  { id: 6, name: '투어' },
];

export const PreferenceBuddySection = () => {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        label="취향 기반 추천"
        title="이런 취향의 동행자는 어떠세요?"
      />
    </section>
  );
};

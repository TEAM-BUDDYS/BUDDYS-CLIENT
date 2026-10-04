'use client';

import { useState } from 'react';

import { BookmarkContainer } from '@/domains/home/components/bookmark-container/bookmark-container';
import { Card, type RecruitmentStatus } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

// TODO: 저장한 동행 목록 API 연동 시 응답 데이터로 교체
const MOCK_SAVED_PARTNERS: {
  postId: number;
  title: string;
  content: string;
  recruitmentStatus: RecruitmentStatus;
  countryName: string;
  startDate: string;
  endDate: string;
  thumbnailImageUrl?: string;
  isBookmarked: boolean;
}[] = [
  {
    postId: 1,
    title: '파리 근교 당일치기 같이 가요',
    content: '몽생미셸 투어 함께할 동행 구해요. 렌트카로 이동 예정이에요.',
    recruitmentStatus: 'RECRUITING',
    countryName: '프랑스',
    startDate: '2026-10-18',
    endDate: '2026-10-18',
    thumbnailImageUrl: 'https://picsum.photos/seed/saved-partner-1/200/200',
    isBookmarked: true,
  },
  {
    postId: 2,
    title: '바르셀로나 가우디 투어 동행',
    content: '사그라다 파밀리아랑 구엘 공원 같이 돌아볼 분 찾아요.',
    recruitmentStatus: 'RECRUITING',
    countryName: '스페인',
    startDate: '2026-11-02',
    endDate: '2026-11-04',
    isBookmarked: true,
  },
];

export const SavedPartnerList = () => {
  const [partners, setPartners] = useState(MOCK_SAVED_PARTNERS);

  const handleBookmarkClick = (postId: number) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.postId === postId
          ? { ...partner, isBookmarked: !partner.isBookmarked }
          : partner,
      ),
    );
  };

  return (
    <ul className="flex flex-col gap-6">
      {partners.map((partner) => (
        <li key={partner.postId}>
          <BookmarkContainer
            isBookmarked={partner.isBookmarked}
            variant="card"
            onBookmarkClick={() => handleBookmarkClick(partner.postId)}
          >
            <Card
              href={ROUTES.POST.DETAIL(partner.postId)}
              title={partner.title}
              content={partner.content}
              postStatus={partner.recruitmentStatus}
              tagValue={partner.countryName}
              startDate={partner.startDate}
              endDate={partner.endDate}
              image={partner.thumbnailImageUrl}
            />
          </BookmarkContainer>
        </li>
      ))}
    </ul>
  );
};

import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { TodayCard } from '@/domains/home/components/today-card/today-card';
import type { DisplayableClosingSoonPost } from '@/domains/home/model/closing-soon';

// TODO: 마감 임박 동행 게시물 API 연동 시 응답 데이터로 교체
const MOCK_CLOSING_SOON_POSTS: DisplayableClosingSoonPost[] = [
  {
    postId: 1,
    title: '바르셀로나 가우디 투어 같이 가요',
    content: '사그라다 파밀리아랑 구엘 공원 함께 둘러봐요',
    startDate: '2026-10-08',
    endDate: '2026-10-08',
    isSaved: false,
    country: { name: '스페인' },
    thumbnailImageUrl: 'https://picsum.photos/seed/closing-soon-1/200/200',
  },
  {
    postId: 2,
    title: '파리 루브르 박물관 동행 구해요',
    content: '오전 일찍 입장해서 천천히 관람할 분 찾아요',
    startDate: '2026-10-09',
    endDate: '2026-10-10',
    isSaved: false,
    country: { name: '프랑스' },
  },
  {
    postId: 3,
    title: '런던 뮤지컬 같이 보실 분',
    content: '웨스트엔드 뮤지컬 저녁 공연 함께 봐요',
    startDate: '2026-10-08',
    endDate: '2026-10-08',
    isSaved: false,
    country: { name: '영국' },
    thumbnailImageUrl: 'https://picsum.photos/seed/closing-soon-3/200/200',
  },
  {
    postId: 4,
    title: '프라하 야경 투어 동행',
    content: '까를교부터 프라하성까지 야경 보러 가요',
    startDate: '2026-10-09',
    endDate: '2026-10-09',
    isSaved: false,
    country: { name: '체코' },
    thumbnailImageUrl: 'https://picsum.photos/seed/closing-soon-4/200/200',
  },
];

export const ClosingSoonBuddySection = () => {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title="곧 마감임박!"
        description="오늘 바로 동행할 버디를 찾아보세요"
      />
      <div className="flex flex-col gap-5">
        {MOCK_CLOSING_SOON_POSTS.map((post) => (
          <TodayCard key={post.postId} post={post} />
        ))}
      </div>
    </section>
  );
};

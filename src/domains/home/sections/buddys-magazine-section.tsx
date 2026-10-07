import { MagazineCard } from '@/domains/home/components/magazine-card';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { ROUTES } from '@/shared/config';

// TODO: 매거진 목록 API 연동 시 응답 데이터로 교체
const MOCK_HOME_MAGAZINES = [
  {
    magazineId: 1,
    title: '유럽 교환학생이라면 루프트한자 학생 혜택부터!',
    summary: '유럽 교환학생을 준비하고 있다면 꼭 확인해야 할 혜택을 소개해요.',
    thumbnailImageUrl: 'https://picsum.photos/seed/home-magazine-1/686/364',
    externalUrl: 'https://www.instagram.com/p/ABC123/',
  },
  {
    magazineId: 2,
    title: '교환학생 첫 달 생활비, 이렇게 아껴보세요',
    summary: '현지 교통 패스부터 장보기 팁까지 한 번에 정리했어요.',
    thumbnailImageUrl: 'https://picsum.photos/seed/home-magazine-2/686/364',
    externalUrl: 'https://www.instagram.com/p/DEF456/',
  },
];

export const BuddysMagazineSection = () => {
  // TODO: 정적 렌더링 시 빌드 시점의 월로 고정되므로 API 연동 시 응답 기준 월로 교체
  const month = new Date().getMonth() + 1;

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title={`${month}월 버디즈 매거진`}
        moreHref={ROUTES.MAGAZINE}
      />
      <div className="flex flex-col gap-5">
        {MOCK_HOME_MAGAZINES.map((magazine) => (
          <MagazineCard
            key={magazine.magazineId}
            title={magazine.title}
            description={magazine.summary}
            image={{
              src: magazine.thumbnailImageUrl,
              alt: `${magazine.title} 썸네일`,
            }}
            href={magazine.externalUrl}
          />
        ))}
      </div>
    </section>
  );
};

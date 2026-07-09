import { CardProfile } from '@/domains/home/components/card-profile/card-profile';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';

const sameCountryBuddyItems = [
  {
    nickname: '닉네임',
    country: '나라',
    ageGroup: '연령대',
    matchingRate: 100,
    imageUrl: 'https://loremflickr.com/60/60/person?random=1',
    href: '/profile',
  },
  {
    nickname: '닉네임',
    country: '나라',
    ageGroup: '연령대',
    matchingRate: 100,
    imageUrl: 'https://loremflickr.com/60/60/person?random=2',
    href: '/profile',
  },
  {
    nickname: '닉네임',
    country: '나라',
    ageGroup: '연령대',
    matchingRate: 100,
    imageUrl: 'https://loremflickr.com/60/60/person?random=3',
    href: '/profile',
  },
  {
    nickname: '닉네임',
    country: '나라',
    ageGroup: '연령대',
    matchingRate: 100,
    imageUrl: 'https://loremflickr.com/60/60/person?random=4',
    href: '/profile',
  },
  {
    nickname: '닉네임',
    country: '나라',
    ageGroup: '연령대',
    matchingRate: 100,
    imageUrl: 'https://loremflickr.com/60/60/person?random=5',
    href: '/profile',
  },
];

interface SameCountryBuddyItem {
  nickname: string;
  country: string;
  ageGroup: string;
  matchingRate: number;
  imageUrl: string;
  href: string;
}

interface SameCountryBuddySectionProps {
  items: SameCountryBuddyItem[];
}

export const SameCountryBuddySection = () => {
  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        label="오늘의 추천 동행"
        title="같은 파견 국가의 학생이에요"
      />

      <div className="-mx-4 scrollbar-none overflow-x-auto px-4">
        <div className="flex gap-3">
          {sameCountryBuddyItems.map((item) => (
            <CardProfile key={`${item.nickname}-${item.imageUrl}`} {...item} />
          ))}
          <div aria-hidden="true" className="w-2 shrink-0" />
        </div>
      </div>
    </section>
  );
};

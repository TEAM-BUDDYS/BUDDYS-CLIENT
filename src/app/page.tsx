import { SearchSheetButton } from '@/domains/home/components/search-sheet-button/search-sheet-button';
import { WriteFloatingButton } from '@/domains/home/components/write-floating-button/write-floating-button';
import {
  type BuddySearchItem,
  BuddySearchSection,
} from '@/domains/home/sections/buddy-search-section';
import {
  type PreferenceBuddyItem,
  PreferenceBuddySection,
} from '@/domains/home/sections/preference-buddy-section';
import {
  type SameCountryBuddyItem,
  SameCountryBuddySection,
} from '@/domains/home/sections/same-country-buddy-section';
import { TodayBuddySection } from '@/domains/home/sections/today-buddy-section';
import { BellIcon } from '@/shared/components/icons';
import { BuddysLogo } from '@/shared/components/icons/buddys-logo';
import { BottomNavigation, Header } from '@/shared/components/layout';
import type { Tag } from '@/types/tag';

const temporaryImage = 'https://loremflickr.com/412/264/travel?random=1';

const temporaryProfileImage = 'https://loremflickr.com/48/48/person?random=1';

const todayBuddyItems = [
  {
    href: '/posts/1',
    imageUrl: temporaryImage,
    carouselInfo: {
      profileImageUrl: temporaryProfileImage,
      title: '최대 17자 제목이에요',
      country: '일본',
      viewCount: 1234,
    },
  },
  {
    href: '/posts/2',
    imageUrl: temporaryImage,
    carouselInfo: {
      profileImageUrl: temporaryProfileImage,
      title: '도쿄 같이 걸을 버디',
      country: '일본',
      viewCount: 856,
    },
  },
  {
    href: '/posts/3',
    imageUrl: temporaryImage,
    carouselInfo: {
      profileImageUrl: temporaryProfileImage,
      title: '주말 여행 동행 구해요',
      country: '대만',
      viewCount: 432,
    },
  },
];

const buddySearchItems: BuddySearchItem[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: index + 1,
    href: `/posts/${index + 1}`,
    title: '최대 17자 제목이 들어가는 자리입니다',
    content: '최대 21자 본문이 들어가는 자리입니다.',
    postStatus: 'RECRUITING',
    tagValue: '국가',
    startDate: '2026-07-10',
    endDate: '2026-07-12',
    image:
      index % 2 === 0
        ? undefined
        : `https://loremflickr.com/100/100/travel?random=${index + 1}`,
  }),
);

const sameCountryBuddyItems: SameCountryBuddyItem[] = Array.from(
  { length: 5 },
  (_, index) => ({
    nickname: '닉네임',
    country: '일본',
    ageGroup: '20대',
    matchingRate: 100,
    imageUrl: `https://loremflickr.com/60/60/person?random=${index + 1}`,
    href: `/profile/${index + 1}`,
  }),
);

const preferenceTags: Tag[] = [
  { id: 1, name: '여행' },
  { id: 2, name: '맛집 탐방' },
  { id: 3, name: '언어교환' },
  { id: 4, name: '생활 도움' },
  { id: 5, name: '공부' },
  { id: 6, name: '투어' },
];

const preferenceBuddyItems: PreferenceBuddyItem[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: index + 1,
    href: `/posts/${index + 1}`,
    title: '최대 17자 제목이 들어가는 자리입니다',
    content: '최대 18자 본문이 들어가는 자리입니다.',
    startDate: '2026-07-10',
    endDate: '2026-07-12',
    image:
      index % 2 === 0
        ? `https://loremflickr.com/80/80/travel?random=${index + 1}`
        : undefined,
  }),
);

export default function Home() {
  return (
    <>
      <Header
        content={<BuddysLogo width={90} height={24} />}
        right={
          <>
            <SearchSheetButton />
            <button type="button" aria-label="알림">
              <BellIcon className="size-6" />
            </button>
          </>
        }
      />
      <main className="px-4 pb-33">
        <TodayBuddySection items={todayBuddyItems} />
        <hr
          className="-mx-4 my-6 h-2 border-0 bg-gray-50 opacity-50"
          aria-hidden="true"
        />
        <BuddySearchSection items={buddySearchItems} />
        <hr
          className="-mx-4 my-6 h-2 border-0 bg-gray-50 opacity-50"
          aria-hidden="true"
        />
        <SameCountryBuddySection items={sameCountryBuddyItems} />
        <hr
          className="-mx-4 my-6 h-2 border-0 bg-gray-50 opacity-50"
          aria-hidden="true"
        />
        <PreferenceBuddySection
          tags={preferenceTags}
          items={preferenceBuddyItems}
        />
      </main>
      <WriteFloatingButton />
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
    </>
  );
}

import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { SearchSheetButton } from '@/domains/home/components/search-sheet-button/search-sheet-button';
import { WriteFloatingButton } from '@/domains/home/components/write-floating-button/write-floating-button';
import { BuddySearchSection } from '@/domains/home/sections/buddy-search-section';
import { PreferenceBuddySection } from '@/domains/home/sections/preference-buddy-section';
import {
  type SameCountryBuddyItem,
  SameCountryBuddySection,
} from '@/domains/home/sections/same-country-buddy-section';
import { TodayBuddySection } from '@/domains/home/sections/today-buddy-section';
import { BellIcon } from '@/shared/components/icons';
import { BuddysLogo } from '@/shared/components/icons/buddys-logo';
import { BottomNavigation, Header } from '@/shared/components/layout';
import { ROUTES } from '@/shared/config';

const temporaryImage = 'https://loremflickr.com/412/264/travel?random=1';

const temporaryProfileImage = 'https://loremflickr.com/48/48/person?random=1';

const todayBuddyItems = [
  {
    href: ROUTES.POST.DETAIL(1),
    imageUrl: temporaryImage,
    carouselInfo: {
      profileImageUrl: temporaryProfileImage,
      title: '최대 17자 제목이에요',
      country: '일본',
      viewCount: 1234,
    },
  },
  {
    href: ROUTES.POST.DETAIL(2),
    imageUrl: temporaryImage,
    carouselInfo: {
      profileImageUrl: temporaryProfileImage,
      title: '도쿄 같이 걸을 버디',
      country: '일본',
      viewCount: 856,
    },
  },
  {
    href: ROUTES.POST.DETAIL(3),
    imageUrl: temporaryImage,
    carouselInfo: {
      profileImageUrl: temporaryProfileImage,
      title: '주말 여행 동행 구해요',
      country: '대만',
      viewCount: 432,
    },
  },
];

const sameCountryBuddyItems: SameCountryBuddyItem[] = Array.from(
  { length: 5 },
  (_, index) => ({
    nickname: '닉네임',
    country: '일본',
    ageGroup: '20대',
    matchingRate: 100,
    imageUrl: `https://loremflickr.com/60/60/person?random=${index + 1}`,
    href: ROUTES.PROFILE.DETAIL(index + 1),
  }),
);

export default function Home() {
  return (
    <AuthEntryGuard>
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
        <BuddySearchSection />
        <hr
          className="-mx-4 my-6 h-2 border-0 bg-gray-50 opacity-50"
          aria-hidden="true"
        />
        <SameCountryBuddySection items={sameCountryBuddyItems} />
        <hr
          className="-mx-4 my-6 h-2 border-0 bg-gray-50 opacity-50"
          aria-hidden="true"
        />
        <PreferenceBuddySection />
      </main>
      <WriteFloatingButton />
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
    </AuthEntryGuard>
  );
}

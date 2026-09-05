import { NotificationBellButton } from '@/domains/home/components/notification-bell-button/notification-bell-button';
import { SearchSheetButton } from '@/domains/home/components/search-sheet-button/search-sheet-button';
import { WriteFloatingButton } from '@/domains/home/components/write-floating-button/write-floating-button';
import { BuddySearchSection } from '@/domains/home/sections/buddy-search-section';
import { PreferenceBuddySection } from '@/domains/home/sections/preference-buddy-section';
import { SameCountryBuddySection } from '@/domains/home/sections/same-country-buddy-section';
import { TodayBuddySection } from '@/domains/home/sections/today-buddy-section';
import { BuddysLogoIcon } from '@/shared/components/icons';
import { BottomNavigation, Header } from '@/shared/components/layout';

export default function Home() {
  return (
    <>
      <Header
        content={
          <BuddysLogoIcon
            className="text-gray-800"
            width={80.043}
            height={21.12}
          />
        }
        right={
          <>
            <SearchSheetButton />
            <NotificationBellButton />
          </>
        }
      />
      <main className="px-4 pb-33">
        <TodayBuddySection />
        <hr
          className="-mx-4 my-6 h-2 border-0 bg-gray-50 opacity-50"
          aria-hidden="true"
        />
        <BuddySearchSection />
        <hr
          className="-mx-4 my-6 h-2 border-0 bg-gray-50 opacity-50"
          aria-hidden="true"
        />
        <SameCountryBuddySection />
        <hr
          className="-mx-4 my-6 h-2 border-0 bg-gray-50 opacity-50"
          aria-hidden="true"
        />
        <PreferenceBuddySection />
      </main>
      <WriteFloatingButton />
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
    </>
  );
}

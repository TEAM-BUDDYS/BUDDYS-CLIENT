import { PostCreateBanner } from '@/domains/home/components/post-create-banner/post-create-banner';
import { WriteFloatingButton } from '@/domains/home/components/write-floating-button/write-floating-button';
import { PwaInstallPromptClient } from '@/domains/home/features/pwa/pwa-install-prompt-client';
import { BuddysMagazineSection } from '@/domains/home/sections/buddys-magazine-section';
import { ClosingSoonBuddySection } from '@/domains/home/sections/closing-soon-buddy-section';
import { ExchangeCountryCourseSection } from '@/domains/home/sections/exchange-country-course-section';
import { InterestCountryCourseSection } from '@/domains/home/sections/interest-country-course-section';
import { TodayBuddySection } from '@/domains/home/sections/today-buddy-section';
import { BuddysLogoIcon } from '@/shared/components/icons';
import {
  BottomNavigation,
  Header,
  NotificationBellButton,
  SearchSheetButton,
} from '@/shared/components/layout';

export default function Home() {
  return (
    <>
      <Header
        className="h-auto items-start pt-5 pb-4"
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
      <main className="px-4 pt-2 pb-33">
        <PostCreateBanner />
        <TodayBuddySection />
        <div className="mt-6 flex flex-col gap-15">
          <ClosingSoonBuddySection />
          <BuddysMagazineSection />
          <InterestCountryCourseSection />
          <ExchangeCountryCourseSection />
        </div>
      </main>
      <WriteFloatingButton />
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
      <PwaInstallPromptClient />
    </>
  );
}

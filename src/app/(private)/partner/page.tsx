import { NotificationBellButton } from '@/domains/home/components/notification-bell-button/notification-bell-button';
import { SearchSheetButton } from '@/domains/home/components/search-sheet-button/search-sheet-button';
import { PartnerPageContent } from '@/domains/partner/features/partner-page/partner-page-content';
import { BuddysLogoIcon } from '@/shared/components/icons';
import { BottomNavigation, Header } from '@/shared/components/layout';

export default function PartnerPage() {
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
      <PartnerPageContent />
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
    </>
  );
}

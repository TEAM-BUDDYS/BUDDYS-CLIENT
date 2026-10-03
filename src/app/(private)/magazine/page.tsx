import { NotificationBellButton } from '@/domains/home/components/notification-bell-button/notification-bell-button';
import { SearchSheetButton } from '@/domains/home/components/search-sheet-button/search-sheet-button';
import { MagazineContent } from '@/domains/home/features/magazine/magazine-content';
import { BuddysLogoIcon } from '@/shared/components/icons';
import { BottomNavigation, Header } from '@/shared/components/layout';

export default function MagazinePage() {
  return (
    <>
      <Header
        className="h-auto items-start pt-5 pb-4"
        content={
          <div className="flex items-center gap-0.5">
            <BuddysLogoIcon
              className="text-gray-800"
              width={80.043}
              height={21.12}
            />
            <h1 className="text-body-sb-16 whitespace-pre text-gray-800">
              <span aria-hidden="true">{' | '}</span>
              MAGAZINE
            </h1>
          </div>
        }
        right={
          <>
            <SearchSheetButton />
            <NotificationBellButton />
          </>
        }
      />
      <MagazineContent />
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
    </>
  );
}

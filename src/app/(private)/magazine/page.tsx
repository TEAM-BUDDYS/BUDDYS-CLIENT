import { MagazineContent } from '@/domains/home/features/magazine/magazine-content';
import { BuddysLogoIcon } from '@/shared/components/icons';
import {
  Header,
  NotificationBellButton,
  SearchSheetButton,
} from '@/shared/components/layout';

export default function MagazinePage() {
  return (
    <>
      <Header
        hasBackButton
        content={
          <div className="flex items-center">
            <BuddysLogoIcon className="text-gray-800" width={76} height={20} />
            <h1 className="text-title-b-20 whitespace-pre text-gray-800">
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
    </>
  );
}

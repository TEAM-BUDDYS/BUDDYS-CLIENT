import { PartnerPageContent } from '@/domains/partner/features/partner-page/partner-page-content';
import { BottomNavigation } from '@/shared/components/layout';

export default function PartnerPage() {
  return (
    <>
      <PartnerPageContent />
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
    </>
  );
}

import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';
import { CustomizedExploreContent } from '@/domains/home/features/customized-explore/customized-explore-content';

export default function CustomizedExplore() {
  return (
    <AuthEntryGuard>
      <CustomizedExploreContent />
    </AuthEntryGuard>
  );
}

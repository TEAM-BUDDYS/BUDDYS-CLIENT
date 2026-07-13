'use client';

import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';

import { CustomizedExploreContent } from './customized-explore-content';

export default function CustomizedExplore() {
  return (
    <AuthEntryGuard>
      <CustomizedExploreContent />
    </AuthEntryGuard>
  );
}

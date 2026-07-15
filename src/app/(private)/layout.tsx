import type { ReactNode } from 'react';

import { AuthEntryGuard } from '@/domains/auth/features/auth-session/auth-entry-guard';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return <AuthEntryGuard>{children}</AuthEntryGuard>;
}

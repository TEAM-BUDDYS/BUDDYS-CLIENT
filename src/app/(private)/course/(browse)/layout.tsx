import type { ReactNode } from 'react';

import { CourseBrowseProvider } from '@/domains/course/features/course-browse/course-browse-provider';
import { WriteFloatingButton } from '@/domains/home/components/write-floating-button/write-floating-button';
import { BottomNavigation } from '@/shared/components/layout';

interface CourseBrowseLayoutProps {
  children: ReactNode;
}

export default function CourseBrowseLayout({
  children,
}: CourseBrowseLayoutProps) {
  return (
    <CourseBrowseProvider>
      {children}
      <WriteFloatingButton />
      <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
    </CourseBrowseProvider>
  );
}

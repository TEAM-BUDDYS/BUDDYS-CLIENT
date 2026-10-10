'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { CourseBrowseProvider } from '@/domains/course/features/course-browse/course-browse-provider';
import { PlusIcon } from '@/shared/components/icons';
import { BottomNavigation } from '@/shared/components/layout';
import { IconButton } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useVirtualKeyboard } from '@/shared/hooks/use-virtual-keyboard';

interface CourseBrowseLayoutProps {
  children: ReactNode;
}

export default function CourseBrowseLayout({
  children,
}: CourseBrowseLayoutProps) {
  const router = useRouter();
  const isKeyboardOpen = useVirtualKeyboard();

  return (
    <CourseBrowseProvider>
      {children}
      <div className="pointer-events-none fixed bottom-23 left-1/2 z-40 flex w-full max-w-107.5 -translate-x-1/2 justify-end px-4">
        <IconButton
          variant="primary"
          icon={<PlusIcon />}
          aria-label="글쓰기"
          className="pointer-events-auto h-11 px-2.5 py-0"
          onClick={() => router.push(ROUTES.COURSE.CREATE)}
        >
          글쓰기
        </IconButton>
      </div>
      {!isKeyboardOpen && (
        <BottomNavigation className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-107.5" />
      )}
    </CourseBrowseProvider>
  );
}

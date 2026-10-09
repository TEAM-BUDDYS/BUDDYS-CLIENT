'use client';

import { Header } from '@/shared/components/layout';
import { EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useIsShareEntry } from '@/shared/hooks/use-share-entry';

export const CourseNotFoundView = () => {
  const isShareEntry = useIsShareEntry();

  return (
    <main className="relative min-h-dvh bg-white">
      <Header
        hasBackButton
        backFallbackHref={isShareEntry ? ROUTES.HOME : undefined}
      />
      <EmptyState
        className="absolute top-[calc(50%-10px)] left-1/2 -translate-x-1/2 -translate-y-1/2"
        title="코스를 찾을 수 없어요"
        description="삭제되었거나 존재하지 않는 코스예요"
      />
    </main>
  );
};

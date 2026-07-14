'use client';

import { Header } from '@/shared/components/layout';
import { EmptyState } from '@/shared/components/ui';

export const PostNotFoundView = () => {
  return (
    <main className="relative min-h-dvh bg-white">
      <Header hasBackButton />
      <EmptyState
        className="absolute top-[calc(50%-10px)] left-1/2 -translate-x-1/2 -translate-y-1/2"
        title="게시물을 찾을 수 없어요"
        description="검색 조건을 변경해 보세요"
      />
    </main>
  );
};

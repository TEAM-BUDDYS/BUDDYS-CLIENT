'use client';

import { useRouter } from 'next/navigation';

import { Header } from '@/shared/components/layout';
import { Button, EmptyState } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-dvh flex-col bg-white pb-8.5">
      <Header hasBackButton />

      <EmptyState
        className="absolute top-[calc(50%-10px)] left-1/2 -translate-x-1/2 -translate-y-1/2"
        title="페이지를 찾을 수 없어요"
        description="잘못된 주소이거나 삭제된 페이지예요"
      />

      <div className="mt-auto px-4">
        <Button onClick={() => router.replace(ROUTES.HOME)}>
          홈으로 돌아가기
        </Button>
      </div>
    </main>
  );
}

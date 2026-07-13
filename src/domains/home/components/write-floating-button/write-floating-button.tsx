'use client';

import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';

export const WriteFloatingButton = () => {
  const router = useRouter();

  return (
    <div className="pointer-events-none fixed bottom-22 left-1/2 z-20 flex w-full max-w-107.5 -translate-x-1/2 justify-end px-4">
      <IconButton
        variant="primary"
        icon={<PlusIcon />}
        className="pointer-events-auto"
        onClick={() => router.push('/posts')}
      >
        글쓰기
      </IconButton>
    </div>
  );
};

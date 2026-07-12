'use client';

import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';

export const WriteFloatingButton = () => {
  const router = useRouter();

  return (
    <div className="fixed right-3.75 bottom-22 z-20">
      <IconButton
        variant="primary"
        icon={<PlusIcon />}
        onClick={() => router.push('/posts')}
      >
        글쓰기
      </IconButton>
    </div>
  );
};

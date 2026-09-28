'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  PartnerTab,
  type PartnerTabValue,
} from '@/domains/partner/components/partner-tab/partner-tab';
import { PartnerNowTab } from '@/domains/partner/features/partner-now/partner-now-tab';
import { PlusIcon } from '@/shared/components/icons';
import { IconButton } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { PartnerRecommendTab } from '../partner-recommend/partner-recommend-tab';

export const PartnerPageContent = () => {
  const [tab, setTab] = useState<PartnerTabValue>('now');
  const router = useRouter();

  return (
    <>
      <PartnerTab value={tab} onChange={setTab} />
      <main className="px-4">
        {tab === 'now' && <PartnerNowTab />}
        {tab === 'recommend' && <PartnerRecommendTab />}
      </main>
      <div className="pointer-events-none fixed bottom-22 left-1/2 z-40 flex w-full max-w-107.5 -translate-x-1/2 justify-end px-4">
        <IconButton
          variant="primary"
          icon={<PlusIcon />}
          className="pointer-events-auto"
          onClick={() => router.push(ROUTES.POST.ROOT)}
        >
          글쓰기
        </IconButton>
      </div>
    </>
  );
};

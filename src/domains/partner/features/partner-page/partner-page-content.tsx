'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  PartnerTab,
  type PartnerTabValue,
} from '@/domains/partner/components/partner-tab/partner-tab';
import { PartnerNowTab } from '@/domains/partner/features/partner-now/partner-now-tab';
import { cn } from '@/lib/cn';
import { BuddysLogoIcon, PlusIcon } from '@/shared/components/icons';
import {
  Header,
  NotificationBellButton,
  SearchSheetButton,
} from '@/shared/components/layout';
import { IconButton } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

import { PartnerRecommendTab } from '../partner-recommend/partner-recommend-tab';
import { usePartnerScrollDirection } from './use-partner-scroll-direction';

export const PartnerPageContent = () => {
  const [tab, setTab] = useState<PartnerTabValue>('now');
  const router = useRouter();
  const { isScrollingUp, shouldFixTopNavigation } = usePartnerScrollDirection();
  const isNowNavigationFixed = tab === 'now' && shouldFixTopNavigation;
  const isNowNavigationVisible = isNowNavigationFixed && isScrollingUp;

  const handleTabChange = (nextTab: PartnerTabValue) => {
    if (nextTab === tab) {
      return;
    }

    setTab(nextTab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <div
        className={cn('h-[105px]', tab === 'recommend' && 'sticky top-0 z-40')}
      >
        <div
          className={cn(
            'bg-white',
            isNowNavigationFixed && 'fixed top-0 z-20 w-full max-w-107.5',
            isNowNavigationFixed &&
              (isNowNavigationVisible ? 'translate-y-0' : '-translate-y-full'),
          )}
        >
          <Header
            className="items-start pt-5 pb-4"
            content={
              <BuddysLogoIcon
                className="text-gray-800"
                width={80.043}
                height={21.12}
              />
            }
            right={
              <>
                <SearchSheetButton />
                <NotificationBellButton />
              </>
            }
          />
          <PartnerTab value={tab} onChange={handleTabChange} />
        </div>
      </div>
      <main className="px-4">
        {tab === 'now' && (
          <PartnerNowTab
            isFilterFixed={isNowNavigationFixed}
            isTopNavigationVisible={isNowNavigationVisible}
          />
        )}
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

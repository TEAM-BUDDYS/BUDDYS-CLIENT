import { Suspense } from 'react';

import { CustomizedExploreContent } from '@/domains/home/features/customized-explore/customized-explore-content';
import { AsyncLoadingState } from '@/shared/components/ui';

export default function CustomizedExplore() {
  return (
    <Suspense fallback={<AsyncLoadingState />}>
      <CustomizedExploreContent />
    </Suspense>
  );
}

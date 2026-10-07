import { Suspense } from 'react';

import { SearchResultContent } from '@/domains/home/features/search-result/search-result-content';
import { AsyncLoadingState } from '@/shared/components/ui';

export default function SearchPage() {
  return (
    <Suspense fallback={<AsyncLoadingState />}>
      <SearchResultContent />
    </Suspense>
  );
}

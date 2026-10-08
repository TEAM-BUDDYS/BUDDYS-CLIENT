'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { HOME_QUERY_OPTIONS } from '@/domains/home/api/query';
import { ListToolbar } from '@/domains/home/components/list-toolbar/list-toolbar';
import { MagazineListCard } from '@/domains/home/components/magazine-list-card/magazine-list-card';
import {
  type MagazineCategory,
  magazineCategoryItems,
} from '@/domains/home/model/magazine-category';
import { AsyncBoundary, Filter } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const MAGAZINE_SORT = {
  최신순: 'LATEST',
  저장순: 'BOOKMARK',
} as const;

interface MagazineListProps {
  category: MagazineCategory;
  sort: string;
  onSortChange: (value: string) => void;
}

const MagazineList = ({ category, sort, onSortChange }: MagazineListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    HOME_QUERY_OPTIONS.MAGAZINES_INFINITE({
      category,
      sort: MAGAZINE_SORT[sort as keyof typeof MAGAZINE_SORT],
      size: 10,
    }),
  );

  const magazines = data.pages.flatMap((page) => page.data.magazines);
  const totalCount = data.pages[0]?.data.totalCount ?? 0;
  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  // TODO: 북마크 API 연동
  const handleBookmarkClick = () => undefined;

  return (
    <>
      <div className="mt-6">
        <ListToolbar count={totalCount} value={sort} onChange={onSortChange} />
      </div>

      <ul className="mt-4 flex flex-col gap-5">
        {magazines.map(({ magazineId, ...magazine }) => (
          <li key={magazineId}>
            <MagazineListCard
              {...magazine}
              onBookmarkClick={handleBookmarkClick}
            />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          매거진을 불러오는 중이에요
        </p>
      )}
      {isFetchNextPageError && (
        <button
          type="button"
          className="text-caption-m-12 text-mint-400 mx-auto block py-4"
          onClick={() => fetchNextPage()}
        >
          다시 불러오기
        </button>
      )}
    </>
  );
};

export const MagazineContent = () => {
  const [category, setCategory] = useState<MagazineCategory>('SUPPORT');
  const [sort, setSort] = useState('최신순');

  return (
    <main className="px-4 pt-4 pb-6">
      <div className="flex gap-2">
        {magazineCategoryItems.map((categoryItem) => (
          <Filter
            key={categoryItem.key}
            label={categoryItem.label}
            pressed={category === categoryItem.key}
            onPress={() => setCategory(categoryItem.key)}
          />
        ))}
      </div>

      <AsyncBoundary className="py-8" resetKeys={[category, sort]}>
        <MagazineList category={category} sort={sort} onSortChange={setSort} />
      </AsyncBoundary>
    </main>
  );
};

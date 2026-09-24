'use client';

import { useState } from 'react';

import { CourseTab } from '@/domains/course/components/course-tab/course-tab';
import { BottomSheet } from '@/shared/components/ui';

import {
  NearbyCourseContent,
  type NearbyCourseItem,
} from './nearby-course-content';
import { RecommendedCourseContent } from './recommended-course-content/recommended-course-content';

interface CourseBottomSheetProps {
  open: boolean;
  nearbyItems: readonly NearbyCourseItem[];
  onClose: () => void;
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
  onExploreClick: () => void;
  onSuggestedMoreClick: () => void;
}

export const CourseBottomSheet = ({
  open,
  nearbyItems,
  onClose,
  onBookmarkChange,
  onExploreClick,
  onSuggestedMoreClick,
}: CourseBottomSheetProps) => {
  const [tab, setTab] = useState<'nearby' | 'recommend'>('nearby');

  return (
    <BottomSheet
      open={open}
      ariaLabel="코스 탐색"
      className="z-10 flex h-[59dvh] flex-col"
      modal={false}
      onClose={onClose}
    >
      <div className="flex min-h-0 flex-1 flex-col px-4">
        <div className="shrink-0 pb-4">
          <CourseTab value={tab} onChange={setTab} />
        </div>

        <div className="min-h-0 flex-1 scrollbar-none overflow-x-hidden overflow-y-auto overscroll-contain pb-13.5 [&::-webkit-scrollbar]:hidden">
          {tab === 'nearby' ? (
            <NearbyCourseContent
              items={nearbyItems}
              onBookmarkChange={onBookmarkChange}
            />
          ) : (
            <RecommendedCourseContent
              onExploreClick={onExploreClick}
              onSuggestedMoreClick={onSuggestedMoreClick}
            />
          )}
        </div>
      </div>
    </BottomSheet>
  );
};

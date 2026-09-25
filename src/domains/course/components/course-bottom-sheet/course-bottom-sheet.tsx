'use client';

import { useState } from 'react';

import { CourseTab } from '@/domains/course/components/course-tab/course-tab';
import { BottomSheet } from '@/shared/components/ui';

import {
  NearbyCourseContent,
  type NearbyCourseItem,
} from './nearby-course-content';
import { RecommendedCourseContent } from './recommended-course-content/recommended-course-content';

const COLLAPSED_SNAP_POINT = '78px';
const DEFAULT_SNAP_POINT = 0.59;
const EXPANDED_SNAP_POINT = 0.78;
const COURSE_SNAP_POINTS: (number | string)[] = [
  COLLAPSED_SNAP_POINT,
  DEFAULT_SNAP_POINT,
  EXPANDED_SNAP_POINT,
];

export type CourseBottomSheetPosition = 'collapsed' | 'default' | 'expanded';

interface CourseBottomSheetProps {
  open: boolean;
  position: CourseBottomSheetPosition;
  nearbyItems: readonly NearbyCourseItem[];
  onClose: () => void;
  onPositionChange: (position: CourseBottomSheetPosition) => void;
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
  onExploreClick: () => void;
  onSuggestedMoreClick: () => void;
}

export const CourseBottomSheet = ({
  open,
  position,
  nearbyItems,
  onClose,
  onPositionChange,
  onBookmarkChange,
  onExploreClick,
  onSuggestedMoreClick,
}: CourseBottomSheetProps) => {
  const [tab, setTab] = useState<'nearby' | 'recommend'>('nearby');

  const handleSnapPointChange = (snapPoint: number | string | null) => {
    if (snapPoint === COLLAPSED_SNAP_POINT) {
      onPositionChange('collapsed');
      return;
    }

    if (snapPoint === EXPANDED_SNAP_POINT) {
      onPositionChange('expanded');
      return;
    }

    onPositionChange('default');
  };

  const activeSnapPoint = {
    collapsed: COLLAPSED_SNAP_POINT,
    default: DEFAULT_SNAP_POINT,
    expanded: EXPANDED_SNAP_POINT,
  }[position];

  return (
    <BottomSheet
      activeSnapPoint={activeSnapPoint}
      open={open}
      ariaLabel="코스 탐색"
      className="z-10 flex h-dvh max-h-none flex-col"
      dismissible={false}
      modal={false}
      snapPoints={COURSE_SNAP_POINTS}
      onClose={onClose}
      onSnapPointChange={handleSnapPointChange}
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

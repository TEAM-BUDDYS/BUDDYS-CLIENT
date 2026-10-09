import type { Ref } from 'react';

import type { Place } from '@/domains/course/api/type';
import { CourseSaveCardSkeleton } from '@/domains/course/components/course-save-card/course-save-card-skeleton';
import {
  CourseTab,
  type CourseTabValue,
} from '@/domains/course/components/course-tab/course-tab';
import type { NearbyCourseItem } from '@/domains/course/model/course-place';
import { BottomSheet } from '@/shared/components/ui';

import { BookmarkedPlaceContent } from './bookmarked-place-content';
import { NearbyCourseContent } from './nearby-course-content';
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
  contentRef?: Ref<HTMLDivElement>;
  position: CourseBottomSheetPosition;
  tab: CourseTabValue;
  bookmarkedItems: readonly NearbyCourseItem[];
  hasBookmarkError?: boolean;
  hasBookmarkNextPage?: boolean;
  hasNearbyError?: boolean;
  hasNearbyNextPage?: boolean;
  hasLocationError?: boolean;
  isBookmarkMode: boolean;
  isBookmarkFetchNextPageError?: boolean;
  isBookmarkFetchingNextPage?: boolean;
  isBookmarkLoading?: boolean;
  isNearbyLoading?: boolean;
  isNearbySearchMode?: boolean;
  isNearbyFetchNextPageError?: boolean;
  isNearbyFetchingNextPage?: boolean;
  isPlaceSelectionLoading?: boolean;
  nearbyItems: readonly NearbyCourseItem[];
  pendingBookmarkPlaceIds?: ReadonlySet<string>;
  onClose: () => void;
  onPositionChange: (position: CourseBottomSheetPosition) => void;
  onTabChange: (tab: CourseTabValue) => void;
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
  onPlaceSelect: (place: Place) => void;
  onBookmarkLoadMore?: () => void;
  onBookmarkRetry?: () => void;
  onExploreClick: () => void;
  onNearbyRetry?: () => void;
  onNearbyLoadMore?: () => void;
  onSuggestedMoreClick: () => void;
}

export const CourseBottomSheet = ({
  open,
  contentRef,
  position,
  tab,
  bookmarkedItems,
  hasBookmarkError = false,
  hasBookmarkNextPage = false,
  hasNearbyError = false,
  hasNearbyNextPage = false,
  hasLocationError = false,
  isBookmarkMode,
  isBookmarkFetchNextPageError = false,
  isBookmarkFetchingNextPage = false,
  isBookmarkLoading = false,
  isNearbyLoading = false,
  isNearbySearchMode = false,
  isNearbyFetchNextPageError = false,
  isNearbyFetchingNextPage = false,
  isPlaceSelectionLoading = false,
  nearbyItems,
  pendingBookmarkPlaceIds,
  onClose,
  onPositionChange,
  onTabChange,
  onBookmarkChange,
  onPlaceSelect,
  onBookmarkLoadMore,
  onBookmarkRetry,
  onExploreClick,
  onNearbyRetry,
  onNearbyLoadMore,
  onSuggestedMoreClick,
}: CourseBottomSheetProps) => {
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
      contentRef={contentRef}
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
        {!isBookmarkMode ? (
          <div className="shrink-0 pb-4">
            <CourseTab value={tab} onChange={onTabChange} />
          </div>
        ) : null}

        <div className="min-h-0 flex-1 scrollbar-none overflow-x-hidden overflow-y-auto overscroll-contain pb-100 [&::-webkit-scrollbar]:hidden">
          {isPlaceSelectionLoading ? (
            <div className="border-b border-gray-50 pb-6">
              <CourseSaveCardSkeleton />
            </div>
          ) : isBookmarkMode ? (
            <BookmarkedPlaceContent
              hasError={hasBookmarkError}
              hasNextPage={hasBookmarkNextPage}
              isFetchNextPageError={isBookmarkFetchNextPageError}
              isFetchingNextPage={isBookmarkFetchingNextPage}
              isLoading={isBookmarkLoading}
              items={bookmarkedItems}
              pendingBookmarkPlaceIds={pendingBookmarkPlaceIds}
              onBookmarkChange={onBookmarkChange}
              onPlaceSelect={onPlaceSelect}
              onLoadMore={onBookmarkLoadMore}
              onRetry={onBookmarkRetry}
            />
          ) : tab === 'nearby' ? (
            <NearbyCourseContent
              hasError={hasNearbyError}
              hasLocationError={hasLocationError}
              hasNextPage={hasNearbyNextPage}
              isFetchNextPageError={isNearbyFetchNextPageError}
              isFetchingNextPage={isNearbyFetchingNextPage}
              isLoading={isNearbyLoading}
              isSearchMode={isNearbySearchMode}
              items={nearbyItems}
              pendingBookmarkPlaceIds={pendingBookmarkPlaceIds}
              onBookmarkChange={onBookmarkChange}
              onPlaceSelect={onPlaceSelect}
              onLoadMore={onNearbyLoadMore}
              onRetry={onNearbyRetry}
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

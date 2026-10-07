import type { NearbyCourseItem } from '@/domains/course/model/course-place';

import { NearbyCourseContent } from './nearby-course-content';

interface BookmarkedPlaceContentProps {
  items: readonly NearbyCourseItem[];
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
}

export const BookmarkedPlaceContent = ({
  items,
  onBookmarkChange,
}: BookmarkedPlaceContentProps) => {
  if (items.length === 0) {
    return (
      <div className="flex min-h-full justify-center pt-22.5 text-center">
        <p className="text-body-m-15 whitespace-pre-line text-gray-500">
          {'주변에 저장한 장소가 없어요\n장소를 찾아 북마크해보세요'}
        </p>
      </div>
    );
  }

  return (
    <NearbyCourseContent items={items} onBookmarkChange={onBookmarkChange} />
  );
};

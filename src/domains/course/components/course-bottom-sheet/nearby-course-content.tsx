import type { Place } from '@/domains/course/api/type';
import { CourseSaveCard } from '@/domains/course/components/course-save-card/course-save-card';

export interface NearbyCourseItem {
  place: Place;
  description: string;
}

interface NearbyCourseContentProps {
  items: readonly NearbyCourseItem[];
  onBookmarkChange: (placeId: string, nextBookmarked: boolean) => void;
}

export const NearbyCourseContent = ({
  items,
  onBookmarkChange,
}: NearbyCourseContentProps) => {
  return (
    <div className="flex flex-col gap-6 divide-y-1 divide-gray-50">
      {items.map(({ place, description }) => (
        <div key={place.placeId} className="pb-6">
          <CourseSaveCard
            place={place}
            description={description}
            onBookmarkChange={onBookmarkChange}
          />
        </div>
      ))}
    </div>
  );
};

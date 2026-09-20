import { CardList } from '@/shared/components/ui';

import type { FilteredCourseItem } from './course-filter-section';

interface SavedCourseSectionProps {
  courses: readonly FilteredCourseItem[];
  onCourseBookmarkChange: (courseId: number, nextBookmarked: boolean) => void;
}

export const SavedCourseSection = ({
  courses,
  onCourseBookmarkChange,
}: SavedCourseSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-body-sb-16 text-gray-800">내가 저장한 코스예요</h2>

      <div className="flex flex-col gap-3">
        {courses.map((course) => (
          <CardList
            key={course.id}
            title={course.title}
            description={course.description}
            images={course.images}
            isBookmarked={course.isBookmarked}
            onBookmarkClick={() =>
              onCourseBookmarkChange(course.id, !course.isBookmarked)
            }
          />
        ))}
      </div>
    </section>
  );
};

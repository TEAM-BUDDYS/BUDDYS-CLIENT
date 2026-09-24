import { CourseSectionHeader } from '@/domains/course/components/course-section-header/course-section-header';
import { CardList, ChipButton } from '@/shared/components/ui';

import type { FilteredCourseItem } from './course-filter-section';

export interface SuggestedCourseCategory {
  id: number;
  name: string;
}

interface SuggestedCourseSectionProps {
  categories: readonly SuggestedCourseCategory[];
  courses: readonly FilteredCourseItem[];
  selectedCategoryId?: number;
  onMoreClick: () => void;
  onCategoryChange: (categoryId: number) => void;
  onCourseBookmarkChange: (courseId: number, nextBookmarked: boolean) => void;
}

export const SuggestedCourseSection = ({
  categories,
  courses,
  selectedCategoryId,
  onMoreClick,
  onCategoryChange,
  onCourseBookmarkChange,
}: SuggestedCourseSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <CourseSectionHeader
        title="이런 코스는 어떠세요?"
        onClick={onMoreClick}
      />

      <div className="flex scrollbar-none gap-2 overflow-x-auto overscroll-x-none [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isSelected = category.id === selectedCategoryId;

          return (
            <ChipButton
              key={category.id}
              active={isSelected}
              variant="fillMedium"
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </ChipButton>
          );
        })}
      </div>

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

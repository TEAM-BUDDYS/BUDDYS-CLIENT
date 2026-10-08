import type { CourseSummary } from '@/domains/course/api/type';
import { CourseSectionHeader } from '@/domains/course/components/course-section-header/course-section-header';
import {
  AsyncErrorState,
  AsyncLoadingState,
  CardList,
  ChipButton,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

export interface SuggestedCourseCategory {
  id: number;
  name: string;
}

interface SuggestedCourseSectionProps {
  categories: readonly SuggestedCourseCategory[];
  courses: readonly CourseSummary[];
  hasError: boolean;
  isBookmarkPending: boolean;
  isLoading: boolean;
  selectedCategoryId?: number;
  onMoreClick: () => void;
  onCategoryChange: (categoryId: number) => void;
  onCourseBookmarkChange: (courseId: number, nextBookmarked: boolean) => void;
  onRetry: () => void;
}

export const SuggestedCourseSection = ({
  categories,
  courses,
  hasError,
  isBookmarkPending,
  isLoading,
  selectedCategoryId,
  onMoreClick,
  onCategoryChange,
  onCourseBookmarkChange,
  onRetry,
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

      {isLoading ? (
        <AsyncLoadingState
          className="min-h-40"
          title="추천 코스를 불러오고 있어요"
        />
      ) : hasError ? (
        <AsyncErrorState
          className="min-h-40"
          title="추천 코스를 불러오지 못했어요"
          onRetry={onRetry}
        />
      ) : courses.length === 0 ? (
        <p className="text-body-m-15 py-10 text-center text-gray-500">
          추천 코스가 없어요
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {courses.map((course) => (
            <CardList
              key={course.courseId}
              title={course.title}
              description={[course.countries, course.cities]
                .filter(Boolean)
                .join(' · ')}
              href={ROUTES.COURSE.DETAIL(course.courseId)}
              images={course.images}
              isBookmarked={course.isBookmarked}
              isBookmarkPending={isBookmarkPending}
              onBookmarkClick={() =>
                onCourseBookmarkChange(course.courseId, !course.isBookmarked)
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

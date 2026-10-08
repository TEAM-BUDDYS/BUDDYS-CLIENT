import type { CourseSummary } from '@/domains/course/api/type';
import {
  AsyncErrorState,
  AsyncLoadingState,
  CardList,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

interface SavedCourseSectionProps {
  courses: readonly CourseSummary[];
  hasError: boolean;
  isBookmarkPending: boolean;
  isLoading: boolean;
  onCourseBookmarkChange: (courseId: number, nextBookmarked: boolean) => void;
  onRetry: () => void;
}

export const SavedCourseSection = ({
  courses,
  hasError,
  isBookmarkPending,
  isLoading,
  onCourseBookmarkChange,
  onRetry,
}: SavedCourseSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-body-sb-16 text-gray-800">내가 저장한 코스예요</h2>

      {isLoading ? (
        <AsyncLoadingState
          className="min-h-40"
          title="저장한 코스를 불러오고 있어요"
        />
      ) : hasError ? (
        <AsyncErrorState
          className="min-h-40"
          title="저장한 코스를 불러오지 못했어요"
          onRetry={onRetry}
        />
      ) : courses.length === 0 ? (
        <p className="text-body-m-15 py-10 text-center text-gray-500">
          저장한 코스가 없어요
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

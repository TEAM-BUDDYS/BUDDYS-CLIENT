import type { CourseSummary } from '@/domains/course/api/type';
import { CourseSectionHeader } from '@/domains/course/components/course-section-header/course-section-header';
import {
  AsyncErrorState,
  AsyncLoadingState,
  CardList,
  ChipButton,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

export interface CourseFilterCountry {
  id: number;
  name: string;
}

interface CourseFilterSectionProps {
  countries: readonly CourseFilterCountry[];
  courses: readonly CourseSummary[];
  hasError: boolean;
  isBookmarkPending: boolean;
  isLoading: boolean;
  selectedCountryId?: number;
  onExploreClick: () => void;
  onCountryChange: (countryId: number) => void;
  onCourseBookmarkChange: (courseId: number, nextBookmarked: boolean) => void;
  onRetry: () => void;
}

export const CourseFilterSection = ({
  countries,
  courses,
  hasError,
  isBookmarkPending,
  isLoading,
  selectedCountryId,
  onExploreClick,
  onCountryChange,
  onCourseBookmarkChange,
  onRetry,
}: CourseFilterSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <CourseSectionHeader
        title="원하는 조건의 코스를 찾아보세요"
        onClick={onExploreClick}
      />

      <div className="flex scrollbar-none gap-2 overflow-x-auto overscroll-x-none [&::-webkit-scrollbar]:hidden">
        {countries.map((country) => {
          const isSelected = country.id === selectedCountryId;

          return (
            <ChipButton
              key={country.id}
              active={isSelected}
              variant="fillMedium"
              onClick={() => onCountryChange(country.id)}
            >
              {country.name}
            </ChipButton>
          );
        })}
      </div>

      {isLoading ? (
        <AsyncLoadingState
          className="min-h-40"
          title="코스를 불러오고 있어요"
        />
      ) : hasError ? (
        <AsyncErrorState
          className="min-h-40"
          title="코스를 불러오지 못했어요"
          onRetry={onRetry}
        />
      ) : courses.length === 0 ? (
        <p className="text-body-m-15 py-10 text-center text-gray-500">
          조건에 맞는 코스가 없어요
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

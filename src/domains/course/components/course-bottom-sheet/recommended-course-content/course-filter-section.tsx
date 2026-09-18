import { CourseSectionHeader } from '@/domains/course/components/course-section-header/course-section-header';
import { CardList, ChipButton } from '@/shared/components/ui';

export interface CourseFilterCountry {
  id: number;
  name: string;
}

export interface FilteredCourseItem {
  id: number;
  title: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
  isBookmarked: boolean;
}

interface CourseFilterSectionProps {
  countries: readonly CourseFilterCountry[];
  courses: readonly FilteredCourseItem[];
  selectedCountryId?: number;
  onExploreClick?: () => void;
  onCountryChange: (countryId: number) => void;
  onCourseBookmarkChange: (courseId: number, nextBookmarked: boolean) => void;
}

export const CourseFilterSection = ({
  countries,
  courses,
  selectedCountryId,
  onExploreClick,
  onCountryChange,
  onCourseBookmarkChange,
}: CourseFilterSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <CourseSectionHeader
        title="원하는 조건의 코스를 찾아보세요"
        onClick={onExploreClick}
      />

      <div className="flex scrollbar-none gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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

import {
  CourseDetailDaySection,
  type CourseDetailDaySectionData,
} from './course-detail-day-section';

interface CourseDetailDayListProps {
  days: CourseDetailDaySectionData[];
  preloadFirstImage?: boolean;
}

export const CourseDetailDayList = ({
  days,
  preloadFirstImage = false,
}: CourseDetailDayListProps) => {
  if (days.length === 0) {
    return (
      <p className="text-body-r-14 px-4 py-16 text-center text-gray-500">
        등록된 일정이 없어요.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      {days.map((day, index) => (
        <CourseDetailDaySection
          key={day.dayNumber}
          day={day}
          preloadImage={preloadFirstImage && index === 0}
        />
      ))}
    </div>
  );
};

import type { CourseDay } from '@/domains/course/api/type';
import { CourseDayHeader } from '@/domains/course/components/course-day-header/course-day-header';
import { CourseDayMemoCost } from '@/domains/course/components/course-day-memo-cost/course-day-memo-cost';
import { CoursePlaceTimeline } from '@/domains/course/components/course-place-timeline/course-place-timeline';

import { CourseDayImageCarousel } from './course-day-image-carousel';

export type CourseDetailDaySectionData = Pick<
  CourseDay,
  'dayNumber' | 'date' | 'imageUrls' | 'places' | 'memo' | 'cost'
>;

interface CourseDetailDaySectionProps {
  day: CourseDetailDaySectionData;
  preloadImage?: boolean;
}

export const CourseDetailDaySection = ({
  day,
  preloadImage = false,
}: CourseDetailDaySectionProps) => {
  const headingId = `course-day-${day.dayNumber}-heading`;

  return (
    <section className="flex flex-col gap-6" aria-labelledby={headingId}>
      <CourseDayHeader
        className="px-4"
        id={headingId}
        dayNumber={day.dayNumber}
        date={day.date}
      />
      <CourseDayImageCarousel
        imageUrls={day.imageUrls}
        dayNumber={day.dayNumber}
        preload={preloadImage}
      />
      {day.places.length > 0 && (
        <div className="px-4">
          <CoursePlaceTimeline places={day.places} />
        </div>
      )}
      <CourseDayMemoCost className="px-4" memo={day.memo} cost={day.cost} />
    </section>
  );
};

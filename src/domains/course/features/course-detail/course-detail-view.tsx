'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { CourseDetail } from '@/domains/course/api/type';
import { CourseDayPickerSheet } from '@/domains/course/components/course-day-picker-sheet/course-day-picker-sheet';
import { MoreIcon } from '@/shared/components/icons';
import { Header } from '@/shared/components/layout';
import { PostMenuBottomSheet } from '@/shared/components/ui';
import { ComingSoonModal } from '@/shared/components/ui/modal/coming-soon-modal/coming-soon-modal';

import { CourseContinuationBanner } from './course-continuation-banner';
import { CourseDetailComments } from './course-detail-comments';
import { CourseDetailDayList } from './course-detail-day-list';
import { CourseDetailOverviewSection } from './course-detail-overview-section';

interface CourseDetailViewProps {
  course: CourseDetail;
}

export const CourseDetailView = ({ course }: CourseDetailViewProps) => {
  const [isBookmarked, setIsBookmarked] = useState(course.isBookmarked);
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(
    null,
  );
  const pendingDayScrollRef = useRef<number | null>(null);
  const dayPickerDays = useMemo(
    () =>
      [...course.days]
        .sort((firstDay, secondDay) => firstDay.dayNumber - secondDay.dayNumber)
        .map((day) => ({
          dayNumber: day.dayNumber,
          date: day.date ? new Date(`${day.date}T00:00:00`) : null,
        })),
    [course.days],
  );
  const bookmarkCount =
    course.bookmarkCount + Number(isBookmarked) - Number(course.isBookmarked);

  useEffect(() => {
    if (isDayPickerOpen || pendingDayScrollRef.current === null) return;

    const dayNumber = pendingDayScrollRef.current;
    pendingDayScrollRef.current = null;
    const frameId = window.requestAnimationFrame(() => {
      const dayHeading = document.getElementById(
        `course-day-${dayNumber}-heading`,
      );

      if (!dayHeading) return;

      window.scrollTo({
        behavior: 'smooth',
        top: window.scrollY + dayHeading.getBoundingClientRect().top - 60,
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isDayPickerOpen]);

  const handleDaySelect = (dayNumber: number) => {
    pendingDayScrollRef.current = dayNumber;
    setSelectedDayNumber(dayNumber);
  };

  const handleComingSoonOpen = () => {
    setIsComingSoonOpen(true);
  };

  return (
    <div className="min-h-dvh bg-white">
      <div className="sticky top-0 z-20 bg-white">
        <Header
          hasBackButton
          right={
            <button
              type="button"
              aria-label="코스 메뉴"
              className="focus-visible:outline-mint-300 flex size-11 items-center justify-center rounded-lg text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
              onClick={() => setIsMenuOpen(true)}
            >
              <MoreIcon className="size-6" />
            </button>
          }
        />
      </div>

      <main className="pb-6">
        <div className="px-4 pt-4 pb-6">
          <CourseDetailOverviewSection
            course={course}
            isBookmarked={isBookmarked}
            onBookmarkClick={() => setIsBookmarked((current) => !current)}
            onDayPickerOpen={() => setIsDayPickerOpen(true)}
          />
        </div>

        <CourseDetailDayList days={course.days} preloadFirstImage />

        <div className="flex flex-col gap-6 px-4 py-4">
          <CourseDetailComments
            bookmarkCount={bookmarkCount}
            commentCount={course.commentCount}
            courseId={course.courseId}
            viewCount={course.viewCount}
          />
          <CourseContinuationBanner onClick={handleComingSoonOpen} />
        </div>
      </main>

      <CourseDayPickerSheet
        open={isDayPickerOpen}
        days={dayPickerDays}
        selectedDayNumber={selectedDayNumber}
        onClose={() => setIsDayPickerOpen(false)}
        onDaySelect={handleDaySelect}
      />

      <PostMenuBottomSheet
        open={isMenuOpen}
        isMine={course.isMine}
        ariaLabel="코스 메뉴"
        onClose={() => setIsMenuOpen(false)}
        onAction={handleComingSoonOpen}
      />

      <ComingSoonModal
        open={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </div>
  );
};

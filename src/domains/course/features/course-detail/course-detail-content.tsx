'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';

import { CourseDetailView } from './course-detail-view';

interface CourseDetailContentProps {
  courseId: number;
}

export const CourseDetailContent = ({ courseId }: CourseDetailContentProps) => {
  const { data: course } = useSuspenseQuery(
    COURSE_QUERY_OPTIONS.DETAIL(courseId),
  );

  return <CourseDetailView course={course} />;
};

'use client';

import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';
import type { CourseDetail } from '@/domains/course/api/type';
import { CourseCreateFlow } from '@/domains/course/features/course-create/course-create-flow';
import { CourseNotFoundView } from '@/domains/course/features/course-detail/course-not-found-view';
import { TAG_QUERY_OPTIONS } from '@/shared/api';

import { convertCourseDetailToInitialValue } from './course-edit-initial-value';

interface CourseEditContentProps {
  courseId: number;
}

interface CourseEditFormContentProps {
  course: CourseDetail;
}

const CourseEditFormContent = ({ course }: CourseEditFormContentProps) => {
  const [activityTagsQuery, interestTagsQuery, travelStyleTagsQuery] =
    useSuspenseQueries({
      queries: [
        TAG_QUERY_OPTIONS.LIST('ACTIVITY'),
        TAG_QUERY_OPTIONS.LIST('INTEREST'),
        TAG_QUERY_OPTIONS.LIST('TRAVEL_STYLE'),
      ],
    });
  const initialCourse = convertCourseDetailToInitialValue(course, {
    activityTags: activityTagsQuery.data,
    interestTags: interestTagsQuery.data,
    travelStyleTags: travelStyleTagsQuery.data,
  });

  return <CourseCreateFlow initialCourse={initialCourse} />;
};

export const CourseEditContent = ({ courseId }: CourseEditContentProps) => {
  const { data: course } = useSuspenseQuery(
    COURSE_QUERY_OPTIONS.DETAIL(courseId),
  );

  if (!course.isMine) {
    return <CourseNotFoundView />;
  }

  return <CourseEditFormContent course={course} />;
};

'use client';

import { useQuery, useSuspenseQueries } from '@tanstack/react-query';
import { useState } from 'react';

import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';
import type { CourseDetail } from '@/domains/course/api/type';
import { CourseCreateFlow } from '@/domains/course/features/course-create/course-create-flow';
import { CourseNotFoundView } from '@/domains/course/features/course-detail/course-not-found-view';
import { TAG_QUERY_OPTIONS } from '@/shared/api';
import { AsyncLoadingState } from '@/shared/components/ui';

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
  const [initialCourse] = useState(() =>
    convertCourseDetailToInitialValue(course, {
      activityTags: activityTagsQuery.data,
      interestTags: interestTagsQuery.data,
      travelStyleTags: travelStyleTagsQuery.data,
    }),
  );

  return <CourseCreateFlow initialCourse={initialCourse} />;
};

export const CourseEditContent = ({ courseId }: CourseEditContentProps) => {
  const [hasLoadedCourse, setHasLoadedCourse] = useState(false);
  const {
    data: course,
    error,
    isFetchedAfterMount,
    isFetching,
  } = useQuery({
    ...COURSE_QUERY_OPTIONS.DETAIL(courseId),
    refetchOnMount: hasLoadedCourse ? true : 'always',
  });

  if (!hasLoadedCourse) {
    if (!isFetchedAfterMount || isFetching) {
      return <AsyncLoadingState title="코스를 불러오고 있어요" />;
    }

    if (error) {
      throw error;
    }

    setHasLoadedCourse(true);
  }

  if (!course?.isMine) {
    return <CourseNotFoundView />;
  }

  return <CourseEditFormContent course={course} />;
};

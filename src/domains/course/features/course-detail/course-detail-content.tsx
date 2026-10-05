'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useAuthSession } from '@/domains/auth/features/auth-session/auth-session-provider';
import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';
import type { CommentSectionItem } from '@/shared/components/ui';

import { CourseDetailView } from './course-detail-view';

const EMPTY_COURSE_DETAIL_COMMENTS: CommentSectionItem[] = [];

interface CourseDetailContentProps {
  courseId: number;
}

export const CourseDetailContent = ({ courseId }: CourseDetailContentProps) => {
  const { userId } = useAuthSession();
  const { data: course } = useSuspenseQuery(
    COURSE_QUERY_OPTIONS.DETAIL(courseId),
  );

  return (
    <CourseDetailView
      course={course}
      initialComments={EMPTY_COURSE_DETAIL_COMMENTS}
      viewerUserId={userId}
    />
  );
};

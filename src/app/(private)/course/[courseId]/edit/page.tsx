import { notFound } from 'next/navigation';

import { CourseDetailAsyncBoundary } from '@/domains/course/features/course-detail/course-detail-async-boundary';
import { CourseEditContent } from '@/domains/course/features/course-edit/course-edit-content';

interface CourseEditPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseEditPage({ params }: CourseEditPageProps) {
  const { courseId } = await params;
  const parsedCourseId = Number(courseId);

  if (!Number.isInteger(parsedCourseId) || parsedCourseId <= 0) {
    notFound();
  }

  return (
    <CourseDetailAsyncBoundary courseId={parsedCourseId}>
      <CourseEditContent courseId={parsedCourseId} />
    </CourseDetailAsyncBoundary>
  );
}

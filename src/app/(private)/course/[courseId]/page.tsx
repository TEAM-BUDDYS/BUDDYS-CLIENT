import { notFound } from 'next/navigation';

import { CourseDetailAsyncBoundary } from '@/domains/course/features/course-detail/course-detail-async-boundary';
import { CourseDetailContent } from '@/domains/course/features/course-detail/course-detail-content';

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { courseId } = await params;
  const parsedCourseId = Number(courseId);

  if (!Number.isInteger(parsedCourseId) || parsedCourseId <= 0) {
    notFound();
  }

  return (
    <CourseDetailAsyncBoundary courseId={parsedCourseId}>
      <CourseDetailContent courseId={parsedCourseId} />
    </CourseDetailAsyncBoundary>
  );
}

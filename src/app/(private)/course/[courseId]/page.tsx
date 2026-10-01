import { notFound } from 'next/navigation';

import { getCourseDetailFixture } from '@/domains/course/features/course-detail/course-detail-fixture';
import { CourseDetailView } from '@/domains/course/features/course-detail/course-detail-view';

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

  const fixture = getCourseDetailFixture(parsedCourseId);

  return (
    <CourseDetailView
      course={fixture.course}
      initialComments={fixture.comments}
      viewerUserId={fixture.viewerUserId}
    />
  );
}

import { CourseCreateFlow } from '@/domains/course/features/course-create/course-create-flow';

export default async function CoursePostPage({
  searchParams,
}: {
  searchParams: Promise<{ companionUserId?: string | string[] }>;
}) {
  const { companionUserId } = await searchParams;
  const userId =
    typeof companionUserId === 'string' && /^\d+$/.test(companionUserId)
      ? Number(companionUserId)
      : NaN;

  return (
    <CourseCreateFlow
      companionUserId={
        Number.isSafeInteger(userId) && userId > 0 ? userId : undefined
      }
    />
  );
}

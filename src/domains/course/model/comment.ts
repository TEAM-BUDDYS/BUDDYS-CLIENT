import type { components } from '@/types/schema';

type CourseDetailCommentCandidate =
  components['schemas']['CourseCommentResponse'];

export type CourseDetailComment = CourseDetailCommentCandidate & {
  commentId: number;
  writerId: number;
  writerName: string;
  writerProfileImageUrl?: string | null;
  content: string;
};

const isOptionalString = (value: unknown) =>
  value === undefined || typeof value === 'string';

export const hasCourseDetailCommentFields = (
  value: unknown,
): value is CourseDetailComment => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const comment = value as CourseDetailCommentCandidate;

  return (
    typeof comment.commentId === 'number' &&
    typeof comment.writerId === 'number' &&
    typeof comment.writerName === 'string' &&
    (comment.writerProfileImageUrl === undefined ||
      comment.writerProfileImageUrl === null ||
      typeof comment.writerProfileImageUrl === 'string') &&
    typeof comment.content === 'string' &&
    isOptionalString(comment.createdAt) &&
    isOptionalString(comment.timeAgo)
  );
};

'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useAuthSession } from '@/domains/auth/features/auth-session/auth-session-provider';
import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';
import { hasCourseDetailCommentFields } from '@/domains/course/model/comment';
import { AsyncBoundary, CommentSection } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const COMMENT_PAGE_SIZE = 20;

interface CourseDetailCommentsProps {
  bookmarkCount: number;
  commentCount: number;
  courseId: number;
  viewCount: number;
}

const CourseDetailCommentList = ({
  bookmarkCount,
  commentCount,
  courseId,
  viewCount,
}: CourseDetailCommentsProps) => {
  const { userId } = useAuthSession();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    COURSE_QUERY_OPTIONS.INFINITE_COMMENTS(courseId, {
      size: COMMENT_PAGE_SIZE,
    }),
  );

  const comments = data.pages
    .flatMap((page) => page.comments ?? [])
    .filter(hasCourseDetailCommentFields);
  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  return (
    <>
      <CommentSection
        bookmarkCount={bookmarkCount}
        commentCount={commentCount}
        comments={comments}
        viewCount={viewCount}
        viewerUserId={userId}
      />
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          댓글을 불러오는 중이에요
        </p>
      )}
      {isFetchNextPageError && (
        <button
          type="button"
          className="text-caption-m-12 text-mint-400 mx-auto block py-4"
          onClick={() => void fetchNextPage()}
        >
          다시 불러오기
        </button>
      )}
    </>
  );
};

export const CourseDetailComments = (props: CourseDetailCommentsProps) => {
  return (
    <AsyncBoundary
      className="min-h-60 py-8"
      resetKeys={[props.courseId]}
      loadingState={{ title: '댓글을 불러오고 있어요' }}
      errorState={{ title: '댓글을 불러오지 못했어요' }}
    >
      <CourseDetailCommentList {...props} />
    </AsyncBoundary>
  );
};

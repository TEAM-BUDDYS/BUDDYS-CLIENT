'use client';

import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { type SubmitEvent, useCallback, useState } from 'react';

import { useAuthSession } from '@/domains/auth/features/auth-session/auth-session-provider';
import {
  COURSE_MUTATION_OPTIONS,
  COURSE_QUERY_OPTIONS,
} from '@/domains/course/api/course';
import { hasCourseDetailCommentFields } from '@/domains/course/model/comment';
import { COURSE_QUERY_KEY } from '@/shared/api';
import {
  AsyncBoundary,
  BottomActionBar,
  CommentSection,
} from '@/shared/components/ui';
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
  const { courseId } = props;
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const createCommentMutation = useMutation({
    ...COURSE_MUTATION_OPTIONS.CREATE_COMMENT(),
    onSuccess: () => {
      setComment('');

      void Promise.all([
        queryClient.invalidateQueries({
          queryKey: COURSE_QUERY_KEY.COMMENTS_ALL(courseId),
        }),
        queryClient.invalidateQueries({
          queryKey: COURSE_QUERY_KEY.DETAIL(courseId),
        }),
      ]);
    },
  });

  const handleCommentSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = comment.trim();

    if (!content || createCommentMutation.isPending) {
      return;
    }

    createCommentMutation.mutate({
      courseId,
      body: { content },
    });
  };

  const handleCommentChange = (value: string) => {
    if (createCommentMutation.isError) {
      createCommentMutation.reset();
    }

    setComment(value);
  };

  return (
    <>
      <AsyncBoundary
        className="min-h-60 py-8"
        resetKeys={[courseId]}
        loadingState={{ title: '댓글을 불러오고 있어요' }}
        errorState={{ title: '댓글을 불러오지 못했어요' }}
      >
        <CourseDetailCommentList {...props} />
      </AsyncBoundary>
      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-107.5 -translate-x-1/2 border-t border-gray-100 bg-white">
        {createCommentMutation.isError && (
          <p
            className="text-caption-r-12 text-error px-4 pt-2"
            id="course-comment-submit-error"
            role="alert"
          >
            댓글을 등록하지 못했습니다. 다시 시도해 주세요.
          </p>
        )}
        <BottomActionBar
          aria-busy={createCommentMutation.isPending}
          inputProps={{
            'aria-describedby': createCommentMutation.isError
              ? 'course-comment-submit-error'
              : undefined,
            'aria-invalid': createCommentMutation.isError,
            disabled: createCommentMutation.isPending,
            maxLength: 100,
          }}
          submitDisabled={!comment.trim() || createCommentMutation.isPending}
          value={comment}
          onSubmit={handleCommentSubmit}
          onValueChange={handleCommentChange}
        />
      </div>
    </>
  );
};

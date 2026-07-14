'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { type SubmitEvent, useCallback, useState } from 'react';

import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { hasPostDetailCommentFields } from '@/domains/posts/model/comment';
import { PostDetailCommentSection } from '@/domains/posts/sections/post-detail-comment-section';
import { AsyncBoundary, BottomActionBar } from '@/shared/components/ui';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const COMMENT_PAGE_SIZE = 20;

interface PostDetailCommentListProps {
  postId: number;
  viewCount: number;
  commentCount: number;
}

const PostDetailCommentList = ({
  postId,
  viewCount,
  commentCount,
}: PostDetailCommentListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    POST_QUERY_OPTIONS.INFINITE_COMMENTS(postId, {
      size: COMMENT_PAGE_SIZE,
    }),
  );

  const comments = data.pages
    .flatMap((page) => page.data?.comments ?? [])
    .filter(hasPostDetailCommentFields);
  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  return (
    <>
      <PostDetailCommentSection
        viewCount={viewCount}
        commentCount={commentCount}
        comments={comments}
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
          className="text-caption-sb-12 text-mint-400 mx-auto block py-4"
          onClick={() => fetchNextPage()}
        >
          다시 불러오기
        </button>
      )}
    </>
  );
};

interface PostDetailCommentsProps {
  postId: number;
  viewCount: number;
  commentCount: number;
}

export const PostDetailComments = ({
  postId,
  viewCount,
  commentCount,
}: PostDetailCommentsProps) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: 댓글 작성 API 연동 후 제출 로직 추가
  };

  return (
    <>
      <AsyncBoundary
        className="min-h-60 py-8"
        resetKeys={[postId]}
        loadingState={{ title: '댓글을 불러오고 있어요' }}
        errorState={{ title: '댓글을 불러오지 못했어요' }}
      >
        <PostDetailCommentList
          postId={postId}
          viewCount={viewCount}
          commentCount={commentCount}
        />
      </AsyncBoundary>
      <BottomActionBar
        className="fixed bottom-0 left-1/2 z-20 w-full max-w-107.5 -translate-x-1/2 border-t border-gray-100"
        value={comment}
        onSubmit={handleCommentSubmit}
        onValueChange={setComment}
      />
    </>
  );
};

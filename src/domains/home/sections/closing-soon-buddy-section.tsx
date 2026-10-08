'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { TodayCard } from '@/domains/home/components/today-card/today-card';
import {
  type DisplayableClosingSoonPost,
  isDisplayableClosingSoonPost,
} from '@/domains/home/model/closing-soon';
import { POST_QUERY_OPTIONS } from '@/domains/posts/api/query';
import { usePostBookmark } from '@/domains/posts/features/post-bookmark/use-post-bookmark';
import { AsyncBoundary, EmptyState } from '@/shared/components/ui';

interface ClosingSoonPostItemProps {
  post: DisplayableClosingSoonPost;
}

const ClosingSoonPostItem = ({ post }: ClosingSoonPostItemProps) => {
  const bookmark = usePostBookmark({
    postId: post.postId,
    isBookmarked: post.isSaved ?? false,
  });

  return (
    <TodayCard
      post={post}
      isBookmarked={bookmark.isBookmarked}
      isBookmarkPending={bookmark.isPending}
      onBookmarkClick={bookmark.toggleBookmark}
    />
  );
};

const ClosingSoonPostList = () => {
  const { data } = useSuspenseQuery(POST_QUERY_OPTIONS.CLOSING_SOON());

  const posts = data.filter(isDisplayableClosingSoonPost);

  if (posts.length === 0) {
    return (
      <EmptyState
        title="오늘 마감되는 게시물이 없어요"
        description="동행 탭에서 게시물을 둘러보세요"
        className="py-8"
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <ClosingSoonPostItem key={post.postId} post={post} />
      ))}
    </div>
  );
};

export const ClosingSoonBuddySection = () => {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title="곧 마감임박!"
        description="오늘 바로 동행할 버디를 찾아보세요"
      />
      <AsyncBoundary className="py-8">
        <ClosingSoonPostList />
      </AsyncBoundary>
    </section>
  );
};

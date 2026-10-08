'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import { cn } from '@/lib/cn';
import {
  ArchivePostCard,
  AsyncBoundary,
  EmptyState,
  Tab,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

import { PROFILE_QUERY_OPTIONS } from '../api/query';
import type { UserCourse, UserPost } from '../api/type';
import { CourseImageGrid } from '../components/course-image-grid/course-image-grid';
import {
  type ContentTabValue,
  type CourseItem,
  type PostItem,
} from '../model/content';

interface OtherContentSectionProps {
  userId: number;
  className?: string;
}

const USER_POSTS_PAGE_SIZE = 10;
const USER_COURSES_PAGE_SIZE = 18;

const TAB_ITEMS: { label: string; value: ContentTabValue }[] = [
  { label: '게시물', value: 'post' },
  { label: '코스', value: 'course' },
];

const toPostItem = (post: UserPost): PostItem | null => {
  const { postId, title, content, startDate, endDate, thumbnailImageUrl } =
    post;

  if (
    typeof postId !== 'number' ||
    typeof title !== 'string' ||
    typeof content !== 'string' ||
    typeof startDate !== 'string' ||
    typeof endDate !== 'string'
  ) {
    return null;
  }

  return {
    id: postId,
    title,
    content,
    startDate,
    endDate,
    image: thumbnailImageUrl,
  };
};

const toCourseItem = ({
  courseId,
  thumbnailImageUrl,
}: UserCourse): CourseItem => ({
  id: courseId,
  image: thumbnailImageUrl,
});

const PostTabPanel = ({ userId }: { userId: number }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    PROFILE_QUERY_OPTIONS.USER_POSTS_INFINITE(userId, {
      size: USER_POSTS_PAGE_SIZE,
    }),
  );

  const posts = data.pages
    .flatMap((page) => page.data?.posts ?? [])
    .map(toPostItem)
    .filter((post): post is PostItem => post !== null);

  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  if (posts.length === 0) {
    return (
      <EmptyState
        title="아직 기록된 게시물이 없어요"
        description="게시물이 등록되면 이곳에서 볼 수 있어요"
        className="mt-25"
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      {posts.map((post) => (
        <Link key={post.id} href={ROUTES.POST.DETAIL(post.id)}>
          <ArchivePostCard
            title={post.title}
            content={post.content}
            startDate={post.startDate}
            endDate={post.endDate}
            image={post.image}
          />
        </Link>
      ))}
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          게시물을 불러오는 중이에요
        </p>
      )}
      {isFetchNextPageError && (
        <button
          type="button"
          className="text-caption-m-12 text-mint-400 mx-auto py-4"
          onClick={() => fetchNextPage()}
        >
          다시 불러오기
        </button>
      )}
    </div>
  );
};

const CourseTabPanel = ({ userId }: { userId: number }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    PROFILE_QUERY_OPTIONS.USER_COURSES_INFINITE(userId, {
      size: USER_COURSES_PAGE_SIZE,
    }),
  );

  const courses = data.pages
    .flatMap((page) => page.data?.courses ?? [])
    .map(toCourseItem);

  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled: Boolean(hasNextPage) && !isFetching && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  if (courses.length === 0 && !hasNextPage) {
    return (
      <EmptyState
        title="아직 기록된 코스가 없어요"
        description="코스가 등록되면 이곳에서 볼 수 있어요"
        className="mt-25"
      />
    );
  }

  return (
    <div className="flex flex-col">
      <CourseImageGrid courses={courses} className="pt-3" />
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
      {isFetchingNextPage && (
        <p className="text-caption-m-12 py-4 text-center text-gray-500">
          코스를 불러오는 중이에요
        </p>
      )}
      {isFetchNextPageError && (
        <button
          type="button"
          className="text-caption-m-12 text-mint-400 mx-auto py-4"
          onClick={() => fetchNextPage()}
        >
          다시 불러오기
        </button>
      )}
    </div>
  );
};

export const OtherContentSection = ({
  userId,
  className,
}: OtherContentSectionProps) => {
  const [tab, setTab] = useState<ContentTabValue>('post');

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <Tab
        items={TAB_ITEMS}
        value={tab}
        onChange={(value) => setTab(value as ContentTabValue)}
      />

      {tab === 'post' ? (
        <AsyncBoundary
          key="post"
          className="py-20"
          loadingFallback={<div className="min-h-72" aria-busy="true" />}
        >
          <PostTabPanel userId={userId} />
        </AsyncBoundary>
      ) : (
        <AsyncBoundary
          key="course"
          className="py-20"
          loadingFallback={<div className="min-h-72" aria-busy="true" />}
        >
          <CourseTabPanel userId={userId} />
        </AsyncBoundary>
      )}
    </div>
  );
};

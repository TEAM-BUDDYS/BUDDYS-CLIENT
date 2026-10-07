'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { cn } from '@/lib/cn';
import { ArchivePostCard, AsyncBoundary, Tab } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

import { PROFILE_QUERY_OPTIONS } from '../api/query';
import type { MyCourse, MyPost } from '../api/type';
import { ContentEmptyState } from '../components/content-empty-state/content-empty-state';
import { CourseImageGrid } from '../components/course-image-grid/course-image-grid';
import {
  type ContentTabValue,
  type CourseItem,
  MY_COURSES_PAGE_SIZE,
  MY_POSTS_PAGE_SIZE,
  type PostItem,
} from '../model/content';

interface ContentSectionProps {
  className?: string;
}

const TAB_ITEMS: { label: string; value: ContentTabValue }[] = [
  { label: '게시물', value: 'post' },
  { label: '코스', value: 'course' },
];

const toPostItem = (post: MyPost): PostItem | null => {
  const { postId, title, content, startDate, endDate, thumbnailImageUrl } =
    post;

  if (!postId || !title || !content || !startDate || !endDate) {
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
}: MyCourse): CourseItem => ({
  id: courseId,
  image: thumbnailImageUrl,
});

const PostTabPanel = () => {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    PROFILE_QUERY_OPTIONS.ME_POSTS_INFINITE({ size: MY_POSTS_PAGE_SIZE }),
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
      <div className="mt-25">
        <ContentEmptyState
          title="아직 기록된 게시물이 없어요"
          description="첫 번째 게시물을 공유해보세요"
          buttonLabel="게시물 작성하러 가기"
          onButtonClick={() => router.push(ROUTES.POST.ROOT)}
        />
      </div>
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

const CourseTabPanel = () => {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    PROFILE_QUERY_OPTIONS.ME_COURSES_INFINITE({ size: MY_COURSES_PAGE_SIZE }),
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
      <div className="mt-25">
        <ContentEmptyState
          title="아직 기록된 코스가 없어요"
          description="첫 번째 코스를 공유해보세요"
          buttonLabel="코스 작성하러 가기"
          onButtonClick={() => router.push(ROUTES.COURSE.CREATE)}
        />
      </div>
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

export const ContentSection = ({ className }: ContentSectionProps) => {
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
          className="py-20"
          loadingFallback={<div className="min-h-72" aria-busy="true" />}
        >
          <PostTabPanel />
        </AsyncBoundary>
      ) : (
        <AsyncBoundary
          className="py-20"
          loadingFallback={<div className="min-h-72" aria-busy="true" />}
        >
          <CourseTabPanel />
        </AsyncBoundary>
      )}
    </div>
  );
};

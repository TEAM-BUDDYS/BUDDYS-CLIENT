'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Tab } from '@/shared/components/ui';
import { ArchivePostCard } from '@/shared/components/ui';
import { CommonImage } from '@/shared/components/ui';

import { ContentEmptyState } from '../components/content-empty-state/content-empty-state';
import type { ContentTabValue, CourseItem, PostItem } from '../model/content';

interface ContentSectionProps {
  posts: PostItem[];
  courses: CourseItem[];
  onCourseClick: (course: CourseItem) => void;
  onCreateCourseClick: () => void;
}

const TAB_ITEMS: { label: string; value: ContentTabValue }[] = [
  { label: '게시물', value: 'post' },
  { label: '코스', value: 'course' },
];

export const ContentSection = ({
  posts,
  courses,
  onCourseClick,
  onCreateCourseClick,
}: ContentSectionProps) => {
  const router = useRouter();
  const [tab, setTab] = useState<ContentTabValue>('post');

  return (
    <div className="flex w-full flex-col">
      <Tab
        items={TAB_ITEMS}
        value={tab}
        onChange={(value) => setTab(value as ContentTabValue)}
      />

      {tab === 'post' ? (
        posts.length > 0 ? (
          <div className="flex flex-col gap-2 px-4 py-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <ArchivePostCard
                  title={post.title}
                  content={post.content}
                  startDate={post.startDate}
                  endDate={post.endDate}
                  image={post.image}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-25">
            <ContentEmptyState
              title="아직 기록된 게시물이 없어요"
              description="첫 번째 게시물을 공유해보세요"
              buttonLabel="게시물 작성하러 가기"
              onButtonClick={() => router.push('/posts')}
            />
          </div>
        )
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-0.75 gap-y-1 px-1 py-3">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => onCourseClick(course)}
              className="w-full cursor-pointer"
            >
              {course.image && (
                <CommonImage
                  src={course.image}
                  alt="코스 썸네일"
                  width={300}
                  height={300}
                  radius="rounded-none"
                  unoptimized
                  className="aspect-square w-full"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-25">
          <ContentEmptyState
            title="아직 기록된 게시물이 없어요"
            description="첫 번째 게시물을 공유해보세요"
            buttonLabel="코스 작성하러 가기"
            onButtonClick={onCreateCourseClick}
          />
        </div>
      )}
    </div>
  );
};

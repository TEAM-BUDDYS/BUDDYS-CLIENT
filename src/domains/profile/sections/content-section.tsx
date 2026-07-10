'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ArchivePostCard, Tab } from '@/shared/components/ui';

import { ContentEmptyState } from '../components/content-empty-state/content-empty-state';
import type { ContentTabValue, PostItem } from '../model/content';

interface ContentSectionProps {
  posts: PostItem[];
  onCreateCourseClick: () => void;
}

const TAB_ITEMS: { label: string; value: ContentTabValue }[] = [
  { label: '게시물', value: 'post' },
  { label: '코스', value: 'course' },
];

export const ContentSection = ({
  posts,
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
      ) : (
        <div className="mt-25">
          <ContentEmptyState
            title="아직 기록된 코스가 없어요"
            description="첫 번째 코스를 공유해보세요"
            buttonLabel="코스 작성하러 가기"
            onButtonClick={onCreateCourseClick}
          />
        </div>
      )}
    </div>
  );
};

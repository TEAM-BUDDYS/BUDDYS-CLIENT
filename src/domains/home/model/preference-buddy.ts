import type { PostSummary } from '@/domains/posts/api/type';
import type { Tag } from '@/types/tag';

export const DEFAULT_PREFERENCE_TAG_NAME = '여행';
export const PREFERENCE_BUDDY_SIZE = 4;

export const PREFERENCE_TAGS: Tag[] = [
  { id: 1, name: '여행' },
  { id: 2, name: '맛집 탐방' },
  { id: 3, name: '언어교환' },
  { id: 4, name: '생활 도움' },
  { id: 5, name: '공부' },
  { id: 6, name: '투어' },
];

export type PostWithId = PostSummary & {
  postId: number;
};

export const hasPostId = (post: PostSummary): post is PostWithId => {
  return Boolean(post.postId);
};

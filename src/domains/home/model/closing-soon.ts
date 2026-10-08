import type { ClosingSoonPostSummary } from '@/domains/posts/api/type';

export type DisplayableClosingSoonPost = ClosingSoonPostSummary & {
  postId: number;
  title: string;
  startDate: string;
  endDate: string;
  country: {
    name: string;
  };
};

export const isDisplayableClosingSoonPost = (
  post: ClosingSoonPostSummary,
): post is DisplayableClosingSoonPost => {
  return Boolean(
    post.postId &&
    post.title &&
    post.startDate &&
    post.endDate &&
    post.country?.name,
  );
};

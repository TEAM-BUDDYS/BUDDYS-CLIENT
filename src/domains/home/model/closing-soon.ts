import type { ClosingSoonPostSummary } from '@/domains/posts/api/type';

export type DisplayableClosingSoonPost = ClosingSoonPostSummary & {
  postId: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  country: {
    name: string;
  };
};

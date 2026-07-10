import type { Tag } from '@/types/tag';

import type { PostItem } from './content';

export interface MyProfile {
  imageUrl?: string;
  nickname: string;
  isVerified: boolean;
  tags: Tag[];
  bio?: string | null;
  posts: PostItem[];
}

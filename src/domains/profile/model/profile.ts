import type { Tag } from '@/types/tag';

export interface MyProfile {
  imageUrl?: string | null;
  nickname: string;
  isVerified: boolean;
  tags: Tag[];
  bio?: string | null;
}

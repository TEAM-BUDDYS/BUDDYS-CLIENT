import type { Tag } from '@/types/tag';

export interface MyProfile {
  imageUrl?: string | null;
  nickname: string;
  isVerified: boolean;
  isUniversityEmailVerified: boolean;
  isExchangeDocumentVerified: boolean;
  tags: Tag[];
  bio?: string | null;
}

export type { UserPublicProfile as OtherProfile } from '@/shared/api/user';

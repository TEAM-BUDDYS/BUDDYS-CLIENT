import type { components } from '@/types/schema';
import type { Tag } from '@/types/tag';

export type GetUserProfileResponse =
  components['schemas']['BaseResponseUserPublicProfileResponse'];

export interface UserPublicProfile {
  imageUrl?: string | null;
  nickname: string;
  isVerified: boolean;
  tags: Tag[];
  bio?: string | null;
  isWithdrawn: boolean;
}

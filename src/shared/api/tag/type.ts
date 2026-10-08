import type { components, operations } from '@/types/schema';

export type TagType = operations['getTags']['parameters']['path']['type'];
export type GetTagsResponse =
  components['schemas']['BaseResponseListTagResponse'];

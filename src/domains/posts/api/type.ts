import type { components, operations } from '@/types/schema';

export type GetPostsParams = operations['getPosts']['parameters']['query'];
export type GetPostsResponse =
  components['schemas']['BaseResponsePostListResponse'];
export type PostSummary = components['schemas']['PostSummaryResponse'];
export type ClosingSoonPostSummary =
  components['schemas']['ClosingSoonPostSummaryResponse'];

export type CreatePostRequest = components['schemas']['CreatePostRequest'];
export type CreatePostResponse =
  components['schemas']['BaseResponseCreatePostResponse'];
export type PostErrorResponse = components['schemas']['BaseResponse'];

export type DeletePostResponse =
  components['schemas']['BaseResponseDeletePostResponse'];

export type GetPostDetailResponse =
  components['schemas']['BaseResponsePostDetailResponse'];

export type UpdatePostRequest = components['schemas']['UpdatePostRequest'];
export type UpdatePostResponse =
  components['schemas']['BaseResponseUpdatePostResponse'];

export type UpdatePostStatusRequest =
  components['schemas']['UpdatePostStatusRequest'];
export type UpdatePostStatusResponse =
  components['schemas']['BaseResponseUpdatePostStatusResponse'];

export type GetCommentsParams =
  operations['getComments']['parameters']['query'];
export type GetCommentsResponse =
  components['schemas']['BaseResponseCommentListResponse'];

export type CreateCommentRequest =
  components['schemas']['CreateCommentRequest'];
export type CreateCommentResponse =
  components['schemas']['BaseResponseCreateCommentResponse'];

import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  POST_MUTATION_KEY,
  POST_QUERY_KEY,
} from '@/shared/api';

import type {
  CreateCommentRequest,
  CreateCommentResponse,
  CreatePostRequest,
  CreatePostResponse,
  CreatePresignedUrlRequest,
  CreatePresignedUrlResponse,
  GetCommentsParams,
  GetCommentsResponse,
  GetPostDetailResponse,
  GetPostsParams,
  GetPostsResponse,
  UpdatePostStatusRequest,
  UpdatePostStatusResponse,
} from './type';

const getPosts = async (params?: GetPostsParams) => {
  return apiClient
    .get(END_POINT.POST.LIST, {
      searchParams: createSearchParams(params),
    })
    .json<GetPostsResponse>();
};

const createPost = async (body: CreatePostRequest) => {
  return apiClient
    .post(END_POINT.POST.CREATE, {
      json: body,
    })
    .json<CreatePostResponse>();
};

const getPostDetail = async (postId: number) => {
  return apiClient
    .get(END_POINT.POST.DETAIL(postId))
    .json<GetPostDetailResponse>();
};

const updatePostStatus = async (
  postId: number,
  body: UpdatePostStatusRequest,
) => {
  const response = await apiClient
    .patch(END_POINT.POST.STATUS(postId), {
      json: body,
    })
    .json<UpdatePostStatusResponse>();

  const responsePostId = response.data?.postId;
  const status = response.data?.status;

  if (
    !response.success ||
    responsePostId !== postId ||
    (status !== 'RECRUITING' && status !== 'COMPLETED')
  ) {
    throw new Error(response.message || '모집 상태를 변경하지 못했습니다.');
  }

  return { postId: responsePostId, status };
};

const getComments = async (postId: number, params?: GetCommentsParams) => {
  return apiClient
    .get(END_POINT.POST.COMMENTS(postId), {
      searchParams: createSearchParams(params),
    })
    .json<GetCommentsResponse>();
};

const createComment = async (postId: number, body: CreateCommentRequest) => {
  return apiClient
    .post(END_POINT.POST.COMMENTS(postId), {
      json: body,
    })
    .json<CreateCommentResponse>();
};

const createPresignedUrl = async (body: CreatePresignedUrlRequest) => {
  return apiClient
    .post(END_POINT.IMAGE.PRESIGNED_URL, {
      json: body,
    })
    .json<CreatePresignedUrlResponse>();
};

export const POST_QUERY_OPTIONS = {
  LIST: (params?: GetPostsParams) =>
    queryOptions({
      queryKey: POST_QUERY_KEY.LIST(params),
      queryFn: () => getPosts(params),
    }),
  DETAIL: (postId: number) =>
    queryOptions({
      queryKey: POST_QUERY_KEY.DETAIL(postId),
      queryFn: () => getPostDetail(postId),
    }),
  COMMENTS: (postId: number, params?: GetCommentsParams) =>
    queryOptions({
      queryKey: POST_QUERY_KEY.COMMENTS(postId, params),
      queryFn: () => getComments(postId, params),
    }),
};

export const POST_MUTATION_OPTIONS = {
  CREATE: () =>
    mutationOptions({
      mutationKey: POST_MUTATION_KEY.CREATE(),
      mutationFn: (body: CreatePostRequest) => createPost(body),
    }),
  UPDATE_STATUS: () =>
    mutationOptions({
      mutationKey: POST_MUTATION_KEY.UPDATE_STATUS(),
      mutationFn: ({
        postId,
        body,
      }: {
        postId: number;
        body: UpdatePostStatusRequest;
      }) => updatePostStatus(postId, body),
    }),
  CREATE_COMMENT: () =>
    mutationOptions({
      mutationKey: POST_MUTATION_KEY.CREATE_COMMENT(),
      mutationFn: ({
        postId,
        body,
      }: {
        postId: number;
        body: CreateCommentRequest;
      }) => createComment(postId, body),
    }),
  CREATE_PRESIGNED_URL: () =>
    mutationOptions({
      mutationFn: (body: CreatePresignedUrlRequest) => createPresignedUrl(body),
    }),
};

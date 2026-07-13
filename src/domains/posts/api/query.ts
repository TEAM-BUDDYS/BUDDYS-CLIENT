import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
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
  const response = await apiClient
    .post(END_POINT.POST.CREATE, {
      json: body,
    })
    .json<CreatePostResponse>();

  const postId = response.data?.postId;

  if (
    response.success !== true ||
    typeof postId !== 'number' ||
    !Number.isSafeInteger(postId) ||
    postId <= 0
  ) {
    throw new Error(
      response.message || '게시글 작성 응답이 올바르지 않습니다.',
    );
  }

  return postId;
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
  return apiClient
    .patch(END_POINT.POST.STATUS(postId), {
      json: body,
    })
    .json<UpdatePostStatusResponse>();
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
      mutationKey: [...POST_QUERY_KEY.ALL, 'create'],
      mutationFn: (body: CreatePostRequest) => createPost(body),
    }),
  UPDATE_STATUS: () =>
    mutationOptions({
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

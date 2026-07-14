import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

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

export const POST_QUERY_OPTIONS = {
  LIST: (params?: GetPostsParams) =>
    queryOptions({
      queryKey: POST_QUERY_KEY.LIST(params),
      queryFn: () => getPosts(params),
    }),
  INFINITE_LIST: (params?: GetPostsParams) =>
    infiniteQueryOptions({
      queryKey: POST_QUERY_KEY.INFINITE_LIST(params),
      queryFn: ({ pageParam }) => getPosts({ ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.data?.hasNext) {
          return undefined;
        }

        return (lastPage.data.page ?? 0) + 1;
      },
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
};

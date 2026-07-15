import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import {
  apiClient,
  createSearchParams,
  END_POINT,
  POST_MUTATION_KEY,
  POST_QUERY_KEY,
} from '@/shared/api';

import type { PostDetail } from '../model/post-detail';
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

const getPostDetail = async (postId: number): Promise<PostDetail> => {
  const response = await apiClient
    .get(END_POINT.POST.DETAIL(postId))
    .json<GetPostDetailResponse>();

  if (!response.success || !response.data) {
    throw new Error(response.message || '게시글을 불러오지 못했습니다.');
  }

  return response.data as PostDetail;
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

  return { postId, status };
};

const getComments = async (postId: number, params?: GetCommentsParams) => {
  return apiClient
    .get(END_POINT.POST.COMMENTS(postId), {
      searchParams: createSearchParams(params),
    })
    .json<GetCommentsResponse>();
};

const createComment = async (postId: number, body: CreateCommentRequest) => {
  const response = await apiClient
    .post(END_POINT.POST.COMMENTS(postId), {
      json: body,
    })
    .json<CreateCommentResponse>();

  if (!response.success || typeof response.data?.commentId !== 'number') {
    throw new Error(response.message || '댓글을 등록하지 못했습니다.');
  }

  return response.data.commentId;
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
        const page = lastPage.data?.page;

        if (!lastPage.data?.hasNext || typeof page !== 'number') {
          return undefined;
        }

        return page + 1;
      },
    }),
  DETAIL: (postId: number) =>
    queryOptions({
      queryKey: POST_QUERY_KEY.DETAIL(postId),
      queryFn: () => getPostDetail(postId),
    }),
  INFINITE_COMMENTS: (postId: number, params?: GetCommentsParams) =>
    infiniteQueryOptions({
      queryKey: POST_QUERY_KEY.INFINITE_COMMENTS(postId, params),
      queryFn: ({ pageParam }) =>
        getComments(postId, { ...params, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const page = lastPage.data?.page;

        if (!lastPage.data?.hasNext || typeof page !== 'number') {
          return undefined;
        }

        return page + 1;
      },
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
};

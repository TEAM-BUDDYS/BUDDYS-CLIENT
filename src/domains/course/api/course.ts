import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import {
  apiClient,
  COURSE_QUERY_KEY,
  createSearchParams,
  END_POINT,
} from '@/shared/api';

import type {
  CourseBookmark,
  CourseCommentPage,
  CourseDetail,
  CreateCourseCommentRequest,
  CreateCourseCommentResponse,
  GetCourseCommentsParams,
  GetCourseCommentsResponse,
  GetCourseDetailResponse,
  UpdateCourseBookmarkResponse,
} from './type';

interface CreateCourseCommentVariables {
  courseId: number;
  body: CreateCourseCommentRequest;
}

interface UpdateCourseBookmarkVariables {
  courseId: number;
  bookmarked: boolean;
}

const getCourseComments = async (
  courseId: number,
  params?: GetCourseCommentsParams,
  signal?: AbortSignal,
): Promise<CourseCommentPage> => {
  const response = await apiClient
    .get(END_POINT.COURSE.COMMENTS(courseId), {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<GetCourseCommentsResponse>();

  if (response.success !== true || !response.data) {
    throw new Error(response.message || '댓글을 불러오지 못했습니다.');
  }

  return response.data;
};

const getCourseDetail = async (
  courseId: number,
  signal?: AbortSignal,
): Promise<CourseDetail> => {
  const response = await apiClient
    .get(END_POINT.COURSE.DETAIL(courseId), { signal })
    .json<GetCourseDetailResponse>();

  if (
    response.success !== true ||
    !response.data ||
    response.data.courseId !== courseId
  ) {
    throw new Error(response.message || '코스를 불러오지 못했습니다.');
  }

  return response.data;
};

const createCourseComment = async ({
  courseId,
  body,
}: CreateCourseCommentVariables) => {
  const response = await apiClient
    .post(END_POINT.COURSE.COMMENTS(courseId), {
      json: body,
    })
    .json<CreateCourseCommentResponse>();

  const commentId = response.data?.commentId;

  if (
    response.success !== true ||
    typeof commentId !== 'number' ||
    !Number.isSafeInteger(commentId) ||
    commentId <= 0
  ) {
    throw new Error(response.message || '댓글을 등록하지 못했습니다.');
  }

  return commentId;
};

const updateCourseBookmark = async ({
  courseId,
  bookmarked,
}: UpdateCourseBookmarkVariables): Promise<CourseBookmark> => {
  const endpoint = END_POINT.COURSE.BOOKMARK(courseId);
  const request = bookmarked
    ? apiClient.post(endpoint)
    : apiClient.delete(endpoint);
  const response = await request.json<UpdateCourseBookmarkResponse>();

  if (
    response.success !== true ||
    !response.data ||
    response.data.courseId !== courseId ||
    response.data.bookmarked !== bookmarked
  ) {
    throw new Error(response.message || '코스 북마크를 변경하지 못했습니다.');
  }

  return response.data;
};

export const COURSE_QUERY_OPTIONS = {
  INFINITE_COMMENTS: (courseId: number, params?: GetCourseCommentsParams) =>
    infiniteQueryOptions({
      queryKey: COURSE_QUERY_KEY.INFINITE_COMMENTS(courseId, params),
      queryFn: ({ pageParam, signal }) =>
        getCourseComments(courseId, { ...params, page: pageParam }, signal),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasNext || typeof lastPage.page !== 'number') {
          return undefined;
        }

        return lastPage.page + 1;
      },
    }),
  DETAIL: (courseId: number) =>
    queryOptions({
      queryKey: COURSE_QUERY_KEY.DETAIL(courseId),
      queryFn: ({ signal }) => getCourseDetail(courseId, signal),
    }),
};

export const COURSE_MUTATION_OPTIONS = {
  CREATE_COMMENT: () =>
    mutationOptions({
      mutationFn: createCourseComment,
    }),
  UPDATE_BOOKMARK: () =>
    mutationOptions({
      mutationFn: updateCourseBookmark,
    }),
};

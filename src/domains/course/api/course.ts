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
  CourseListPage,
  CreateCourseCommentRequest,
  CreateCourseCommentResponse,
  CreateCourseRequest,
  CreateCourseResponse,
  DeleteCourseResponse,
  GetBookmarkedCoursesParams,
  GetBookmarkedCoursesResponse,
  GetCourseCommentsParams,
  GetCourseCommentsResponse,
  GetCourseDetailResponse,
  GetCoursesParams,
  GetCoursesResponse,
  UpdateCourseBookmarkResponse,
  UpdateCourseRequest,
  UpdateCourseResponse,
} from './type';

interface CreateCourseCommentVariables {
  courseId: number;
  body: CreateCourseCommentRequest;
}

interface UpdateCourseBookmarkVariables {
  courseId: number;
  bookmarked: boolean;
}

interface UpdateCourseVariables {
  courseId: number;
  body: UpdateCourseRequest;
}

const getCourses = async (
  params: GetCoursesParams,
  signal?: AbortSignal,
): Promise<CourseListPage> => {
  const response = await apiClient
    .get(END_POINT.COURSE.LIST, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<GetCoursesResponse>();

  if (
    response.success !== true ||
    !response.data ||
    !Array.isArray(response.data.content)
  ) {
    throw new Error(response.message || '코스 목록을 불러오지 못했습니다.');
  }

  return response.data;
};

const getBookmarkedCourses = async (
  params: GetBookmarkedCoursesParams,
  signal?: AbortSignal,
): Promise<CourseListPage> => {
  const response = await apiClient
    .get(END_POINT.COURSE.BOOKMARKS, {
      searchParams: createSearchParams(params),
      signal,
    })
    .json<GetBookmarkedCoursesResponse>();

  if (
    response.success !== true ||
    !response.data ||
    !Array.isArray(response.data.content)
  ) {
    throw new Error(response.message || '저장한 코스를 불러오지 못했습니다.');
  }

  return response.data;
};

const createCourse = async (body: CreateCourseRequest) => {
  const response = await apiClient
    .post(END_POINT.COURSE.CREATE, {
      json: body,
    })
    .json<CreateCourseResponse>();
  const courseId = response.data?.courseId;

  if (
    response.success !== true ||
    typeof courseId !== 'number' ||
    !Number.isSafeInteger(courseId) ||
    courseId <= 0
  ) {
    throw new Error(response.message || '코스 작성 응답이 올바르지 않습니다.');
  }

  return courseId;
};

const updateCourse = async ({ courseId, body }: UpdateCourseVariables) => {
  const response = await apiClient
    .put(END_POINT.COURSE.DETAIL(courseId), {
      json: body,
    })
    .json<UpdateCourseResponse>();
  const updatedCourseId = response.data?.courseId;

  if (
    response.success !== true ||
    typeof updatedCourseId !== 'number' ||
    !Number.isSafeInteger(updatedCourseId) ||
    updatedCourseId <= 0 ||
    updatedCourseId !== courseId
  ) {
    throw new Error(response.message || '코스 수정 응답이 올바르지 않습니다.');
  }

  return updatedCourseId;
};

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

const deleteCourse = async (courseId: number) => {
  const response = await apiClient
    .delete(END_POINT.COURSE.DETAIL(courseId))
    .json<DeleteCourseResponse>();

  if (response.success !== true) {
    throw new Error(response.message || '코스를 삭제하지 못했습니다.');
  }
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
  LIST: (params: GetCoursesParams) =>
    queryOptions({
      queryKey: COURSE_QUERY_KEY.LIST(params),
      queryFn: ({ signal }) => getCourses(params, signal),
    }),
  INFINITE_LIST: (params: GetCoursesParams) =>
    infiniteQueryOptions({
      queryKey: COURSE_QUERY_KEY.INFINITE_LIST(params),
      queryFn: ({ pageParam, signal }) =>
        getCourses({ ...params, page: pageParam }, signal),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasNext || typeof lastPage.page !== 'number') {
          return undefined;
        }

        return lastPage.page + 1;
      },
    }),
  BOOKMARKS: (params: GetBookmarkedCoursesParams) =>
    queryOptions({
      queryKey: COURSE_QUERY_KEY.BOOKMARKS(params),
      queryFn: ({ signal }) => getBookmarkedCourses(params, signal),
    }),
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
  CREATE: () =>
    mutationOptions({
      mutationFn: createCourse,
    }),
  CREATE_COMMENT: () =>
    mutationOptions({
      mutationFn: createCourseComment,
    }),
  DELETE: () =>
    mutationOptions({
      mutationFn: deleteCourse,
    }),
  UPDATE: () =>
    mutationOptions({
      mutationFn: updateCourse,
    }),
  UPDATE_BOOKMARK: () =>
    mutationOptions({
      mutationFn: updateCourseBookmark,
    }),
};

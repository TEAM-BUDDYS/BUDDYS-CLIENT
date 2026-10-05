import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  COURSE_QUERY_KEY,
  createSearchParams,
  END_POINT,
} from '@/shared/api';

import type {
  CourseCommentPage,
  CourseDetail,
  GetCourseCommentsParams,
  GetCourseCommentsResponse,
  GetCourseDetailResponse,
} from './type';

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

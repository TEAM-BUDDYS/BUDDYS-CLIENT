import { queryOptions } from '@tanstack/react-query';

import { apiClient, COURSE_QUERY_KEY, END_POINT } from '@/shared/api';

import type { CourseDetail, GetCourseDetailResponse } from './type';

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
  DETAIL: (courseId: number) =>
    queryOptions({
      queryKey: COURSE_QUERY_KEY.DETAIL(courseId),
      queryFn: ({ signal }) => getCourseDetail(courseId, signal),
    }),
};

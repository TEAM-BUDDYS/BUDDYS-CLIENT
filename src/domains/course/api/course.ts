import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { apiClient, COURSE_QUERY_KEY, END_POINT } from '@/shared/api';

import type {
  CourseBookmark,
  CourseDetail,
  GetCourseDetailResponse,
  UpdateCourseBookmarkResponse,
} from './type';

interface UpdateCourseBookmarkVariables {
  courseId: number;
  bookmarked: boolean;
}

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
  DETAIL: (courseId: number) =>
    queryOptions({
      queryKey: COURSE_QUERY_KEY.DETAIL(courseId),
      queryFn: ({ signal }) => getCourseDetail(courseId, signal),
    }),
};

export const COURSE_MUTATION_OPTIONS = {
  UPDATE_BOOKMARK: () =>
    mutationOptions({
      mutationFn: updateCourseBookmark,
    }),
};

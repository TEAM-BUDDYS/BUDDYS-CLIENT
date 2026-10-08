'use client';

import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { COURSE_MUTATION_OPTIONS } from '@/domains/course/api/course';
import type { CourseListPage } from '@/domains/course/api/type';
import { COURSE_QUERY_KEY } from '@/shared/api';
import { useToast } from '@/shared/components/ui';

export const useCourseBookmarkMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    ...COURSE_MUTATION_OPTIONS.UPDATE_BOOKMARK(),
    onSuccess: ({ courseId, bookmarked }) => {
      queryClient.setQueriesData<CourseListPage>(
        { queryKey: COURSE_QUERY_KEY.LISTS_ALL() },
        (coursePage) =>
          coursePage && {
            ...coursePage,
            content: coursePage.content.map((course) =>
              course.courseId === courseId
                ? { ...course, isBookmarked: bookmarked }
                : course,
            ),
          },
      );
      queryClient.setQueriesData<InfiniteData<CourseListPage>>(
        { queryKey: COURSE_QUERY_KEY.INFINITE_LISTS_ALL() },
        (coursePages) =>
          coursePages && {
            ...coursePages,
            pages: coursePages.pages.map((coursePage) => ({
              ...coursePage,
              content: coursePage.content.map((course) =>
                course.courseId === courseId
                  ? { ...course, isBookmarked: bookmarked }
                  : course,
              ),
            })),
          },
      );

      if (!bookmarked) {
        queryClient.setQueriesData<CourseListPage>(
          { queryKey: COURSE_QUERY_KEY.BOOKMARKS_ALL() },
          (coursePage) =>
            coursePage && {
              ...coursePage,
              content: coursePage.content.filter(
                (course) => course.courseId !== courseId,
              ),
            },
        );
      }

      void queryClient.invalidateQueries({
        queryKey: COURSE_QUERY_KEY.BOOKMARKS_ALL(),
      });
      void queryClient.invalidateQueries({
        queryKey: COURSE_QUERY_KEY.DETAIL(courseId),
      });
    },
    onError: () => {
      showToast('북마크를 변경하지 못했어요. 다시 시도해 주세요.', {
        variant: 'gray',
      });
    },
  });
};

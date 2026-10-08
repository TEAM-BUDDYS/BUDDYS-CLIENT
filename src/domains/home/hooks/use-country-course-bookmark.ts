'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COURSE_MUTATION_OPTIONS } from '@/domains/course/api/course';
import type {
  CourseListPage,
  GetCoursesParams,
} from '@/domains/course/api/type';
import { COURSE_QUERY_KEY } from '@/shared/api';
import { useToast } from '@/shared/components/ui';

export const useCountryCourseBookmark = (params: GetCoursesParams) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const listQueryKey = COURSE_QUERY_KEY.LIST(params);
  const mutation = useMutation({
    ...COURSE_MUTATION_OPTIONS.UPDATE_BOOKMARK(),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: listQueryKey });

      const previousPage =
        queryClient.getQueryData<CourseListPage>(listQueryKey);

      queryClient.setQueryData<CourseListPage>(listQueryKey, (page) => {
        if (!page) return page;

        return {
          ...page,
          content: page.content.map((course) =>
            course.courseId === variables.courseId
              ? { ...course, isBookmarked: variables.bookmarked }
              : course,
          ),
        };
      });

      return { previousPage };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPage) {
        queryClient.setQueryData(listQueryKey, context.previousPage);
      }

      showToast('북마크를 변경하지 못했어요. 다시 시도해 주세요.', {
        bottomOffsetClassName: 'bottom-26.5',
        variant: 'gray',
      });
    },
    onSettled: (_data, _error, variables) => {
      void queryClient.invalidateQueries({ queryKey: listQueryKey });
      void queryClient.invalidateQueries({
        queryKey: COURSE_QUERY_KEY.DETAIL(variables.courseId),
      });
      void queryClient.invalidateQueries({
        queryKey: COURSE_QUERY_KEY.BOOKMARKS_ALL(),
      });
    },
  });

  const toggleBookmark = (courseId: number, isBookmarked: boolean) => {
    if (mutation.isPending) return;

    mutation.mutate({
      courseId,
      bookmarked: !isBookmarked,
    });
  };

  return { toggleBookmark };
};

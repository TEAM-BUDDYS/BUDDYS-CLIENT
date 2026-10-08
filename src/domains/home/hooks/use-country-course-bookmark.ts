'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COURSE_MUTATION_OPTIONS } from '@/domains/course/api/course';
import type {
  CourseListPage,
  GetCoursesParams,
} from '@/domains/course/api/type';
import { COURSE_MUTATION_KEY, COURSE_QUERY_KEY } from '@/shared/api';
import { useToast } from '@/shared/components/ui';

interface UseCountryCourseBookmarkParams {
  params: GetCoursesParams;
  courseId: number;
}

export const useCountryCourseBookmark = ({
  params,
  courseId,
}: UseCountryCourseBookmarkParams) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const listQueryKey = COURSE_QUERY_KEY.LIST(params);
  const mutationKey = COURSE_MUTATION_KEY.UPDATE_BOOKMARK();

  const setCourseBookmarked = (bookmarked: boolean) => {
    queryClient.setQueryData<CourseListPage>(listQueryKey, (page) => {
      if (!page) return page;

      return {
        ...page,
        content: page.content.map((course) =>
          course.courseId === courseId
            ? { ...course, isBookmarked: bookmarked }
            : course,
        ),
      };
    });
  };

  const mutation = useMutation({
    ...COURSE_MUTATION_OPTIONS.UPDATE_BOOKMARK(),
    mutationKey,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: listQueryKey });

      setCourseBookmarked(variables.bookmarked);
    },
    onError: (_error, variables) => {
      setCourseBookmarked(!variables.bookmarked);

      showToast('북마크를 변경하지 못했어요. 다시 시도해 주세요.', {
        bottomOffsetClassName: 'bottom-26.5',
        variant: 'gray',
      });
    },
    onSettled: () => {
      if (queryClient.isMutating({ mutationKey }) === 1) {
        void queryClient.invalidateQueries({ queryKey: listQueryKey });
      }

      void queryClient.invalidateQueries({
        queryKey: COURSE_QUERY_KEY.DETAIL(courseId),
      });
      void queryClient.invalidateQueries({
        queryKey: COURSE_QUERY_KEY.BOOKMARKS_ALL(),
      });
    },
  });

  const toggleBookmark = (isBookmarked: boolean) => {
    if (mutation.isPending) return;

    mutation.mutate({
      courseId,
      bookmarked: !isBookmarked,
    });
  };

  return { toggleBookmark };
};

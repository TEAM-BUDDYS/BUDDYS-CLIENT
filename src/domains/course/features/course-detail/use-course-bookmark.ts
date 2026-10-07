'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COURSE_MUTATION_OPTIONS } from '@/domains/course/api/course';
import type { CourseDetail } from '@/domains/course/api/type';
import { COURSE_QUERY_KEY } from '@/shared/api';
import { useToast } from '@/shared/components/ui';

interface UseCourseBookmarkParams {
  courseId: number;
  isBookmarked: boolean;
}

export const useCourseBookmark = ({
  courseId,
  isBookmarked,
}: UseCourseBookmarkParams) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const detailQueryKey = COURSE_QUERY_KEY.DETAIL(courseId);
  const mutation = useMutation({
    ...COURSE_MUTATION_OPTIONS.UPDATE_BOOKMARK(),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: detailQueryKey });

      const previousCourse =
        queryClient.getQueryData<CourseDetail>(detailQueryKey);

      queryClient.setQueryData<CourseDetail>(detailQueryKey, (course) => {
        if (!course) return course;

        const bookmarkCountChange = variables.bookmarked ? 1 : -1;

        return {
          ...course,
          isBookmarked: variables.bookmarked,
          bookmarkCount: Math.max(
            0,
            course.bookmarkCount + bookmarkCountChange,
          ),
        };
      });

      return { previousCourse };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCourse) {
        queryClient.setQueryData(detailQueryKey, context.previousCourse);
      }

      showToast('북마크를 변경하지 못했어요. 다시 시도해 주세요.', {
        bottomOffsetClassName: 'bottom-26.5',
        variant: 'gray',
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: detailQueryKey });
    },
  });

  const toggleBookmark = () => {
    if (mutation.isPending) return;

    mutation.mutate({
      courseId,
      bookmarked: !isBookmarked,
    });
  };

  return {
    isPending: mutation.isPending,
    toggleBookmark,
  };
};

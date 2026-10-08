'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { COURSE_MUTATION_OPTIONS } from '@/domains/course/api/course';
import { COURSE_QUERY_KEY, USER_QUERY_KEY } from '@/shared/api';
import { useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

export const useCourseDelete = (courseId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const isDeleteRequestedRef = useRef(false);
  const mutation = useMutation({
    ...COURSE_MUTATION_OPTIONS.DELETE(),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: COURSE_QUERY_KEY.ALL,
        refetchType: 'none',
      });
      void queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.ME_COURSES_ALL(),
        refetchType: 'none',
      });
      showToast('코스가 삭제되었어요');
      router.replace(ROUTES.PROFILE.ROOT);
    },
    onError: () => {
      isDeleteRequestedRef.current = false;
      showToast('코스를 삭제하지 못했어요. 다시 시도해 주세요.', {
        variant: 'gray',
      });
    },
  });

  const deleteCourse = () => {
    if (isDeleteRequestedRef.current) {
      return;
    }

    isDeleteRequestedRef.current = true;
    mutation.mutate(courseId);
  };

  return {
    deleteCourse,
    isPending: mutation.isPending,
  };
};

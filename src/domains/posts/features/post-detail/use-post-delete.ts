'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { POST_MUTATION_OPTIONS } from '@/domains/posts/api/query';
import {
  POST_QUERY_KEY,
  RECOMMENDATION_QUERY_KEY,
  USER_QUERY_KEY,
} from '@/shared/api';
import { useToast } from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';

export const usePostDelete = (postId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const isDeleteRequestedRef = useRef(false);
  const mutation = useMutation({
    ...POST_MUTATION_OPTIONS.DELETE(),
    onSuccess: () => {
      void Promise.all([
        queryClient.invalidateQueries({
          queryKey: POST_QUERY_KEY.ALL,
          refetchType: 'none',
        }),
        queryClient.invalidateQueries({
          queryKey: RECOMMENDATION_QUERY_KEY.POSTS_ALL(),
          refetchType: 'none',
        }),
        queryClient.invalidateQueries({
          queryKey: [...USER_QUERY_KEY.ME(), 'posts'],
          refetchType: 'none',
        }),
      ]);
      showToast('동행 게시글이 삭제되었어요');
      router.replace(ROUTES.PROFILE.ROOT);
    },
    onError: () => {
      showToast('게시글을 삭제하지 못했어요. 다시 시도해 주세요.', {
        variant: 'gray',
      });
    },
    onSettled: () => {
      isDeleteRequestedRef.current = false;
    },
  });

  const deletePost = () => {
    if (isDeleteRequestedRef.current) {
      return;
    }

    isDeleteRequestedRef.current = true;
    mutation.mutate(postId);
  };

  return {
    deletePost,
    isPending: mutation.isPending,
  };
};

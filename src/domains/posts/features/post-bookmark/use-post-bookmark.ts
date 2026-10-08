'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { POST_MUTATION_OPTIONS } from '@/domains/posts/api/query';
import { POST_QUERY_KEY, SEARCH_QUERY_KEY } from '@/shared/api';
import { useToast } from '@/shared/components/ui';

interface UsePostBookmarkParams {
  postId: number;
  isBookmarked: boolean;
}

export const usePostBookmark = ({
  postId,
  isBookmarked,
}: UsePostBookmarkParams) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    ...POST_MUTATION_OPTIONS.UPDATE_BOOKMARK(),
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: POST_QUERY_KEY.ALL,
        }),
        queryClient.invalidateQueries({
          queryKey: SEARCH_QUERY_KEY.ALL,
        }),
      ]);
    },
    onError: () => {
      showToast('북마크를 변경하지 못했어요. 다시 시도해 주세요.', {
        variant: 'gray',
      });
    },
  });

  const displayedIsBookmarked = mutation.isPending
    ? (mutation.variables?.nextBookmarked ?? isBookmarked)
    : isBookmarked;

  const toggleBookmark = () => {
    if (mutation.isPending) return;

    mutation.mutate({
      postId,
      nextBookmarked: !displayedIsBookmarked,
    });
  };

  return {
    isBookmarked: displayedIsBookmarked,
    isPending: mutation.isPending,
    toggleBookmark,
  };
};

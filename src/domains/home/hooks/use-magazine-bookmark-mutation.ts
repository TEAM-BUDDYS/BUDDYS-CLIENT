'use client';

import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { HOME_MUTATION_OPTIONS } from '@/domains/home/api/query';
import type { GetMagazinesResponse } from '@/domains/home/api/type';
import type { GetBookmarkedMagazinesResponse } from '@/domains/profile/api/type';
import { MAGAZINE_QUERY_KEY } from '@/shared/api';
import { useToast } from '@/shared/components/ui';

export const useMagazineBookmarkMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    ...HOME_MUTATION_OPTIONS.UPDATE_MAGAZINE_BOOKMARK(),
    onSuccess: ({ magazineId, isBookmarked }) => {
      const updateList = (
        response: GetMagazinesResponse,
      ): GetMagazinesResponse => ({
        ...response,
        data: {
          ...response.data,
          magazines: response.data.magazines.map((magazine) =>
            magazine.magazineId === magazineId
              ? { ...magazine, isBookmarked }
              : magazine,
          ),
        },
      });

      queryClient.setQueriesData<GetMagazinesResponse>(
        { queryKey: MAGAZINE_QUERY_KEY.LISTS_ALL() },
        (response) => response && updateList(response),
      );
      queryClient.setQueriesData<InfiniteData<GetMagazinesResponse>>(
        { queryKey: MAGAZINE_QUERY_KEY.INFINITE_LISTS_ALL() },
        (data) => data && { ...data, pages: data.pages.map(updateList) },
      );

      if (!isBookmarked) {
        queryClient.setQueriesData<
          InfiniteData<GetBookmarkedMagazinesResponse>
        >(
          { queryKey: MAGAZINE_QUERY_KEY.BOOKMARKS_ALL() },
          (data) =>
            data && {
              ...data,
              pages: data.pages.map((page) => ({
                ...page,
                data: page.data && {
                  ...page.data,
                  magazines: page.data.magazines.filter(
                    (magazine) => magazine.magazineId !== magazineId,
                  ),
                },
              })),
            },
        );
      }

      void queryClient.invalidateQueries({
        queryKey: MAGAZINE_QUERY_KEY.BOOKMARKS_ALL(),
      });
      void queryClient.invalidateQueries({
        queryKey: MAGAZINE_QUERY_KEY.LISTS_ALL(),
      });
      void queryClient.invalidateQueries({
        queryKey: MAGAZINE_QUERY_KEY.INFINITE_LISTS_ALL(),
      });
    },
    onError: () => {
      showToast('매거진 북마크를 변경하지 못했어요. 다시 시도해 주세요.', {
        variant: 'gray',
      });
    },
  });
};

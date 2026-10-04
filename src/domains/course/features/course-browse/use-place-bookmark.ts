import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PLACE_MUTATION_OPTIONS } from '@/domains/course/api/query';
import type { Place } from '@/domains/course/api/type';
import { PLACE_QUERY_KEY } from '@/shared/api';

interface UsePlaceBookmarkParams {
  onBookmarkChange: (placeId: string, bookmarked: boolean) => void;
}

export const usePlaceBookmark = ({
  onBookmarkChange,
}: UsePlaceBookmarkParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...PLACE_MUTATION_OPTIONS.UPDATE_BOOKMARK(),
    onSuccess: (bookmarked, { placeId }) => {
      queryClient.setQueriesData<Place[]>(
        { queryKey: PLACE_QUERY_KEY.NEARBY_ALL() },
        (places) =>
          places?.map((place) =>
            place.placeId === placeId ? { ...place, bookmarked } : place,
          ),
      );
      onBookmarkChange(placeId, bookmarked);
      void queryClient.invalidateQueries({
        queryKey: PLACE_QUERY_KEY.ALL,
      });
    },
  });

  return {
    updateBookmark: mutation.mutateAsync,
  };
};

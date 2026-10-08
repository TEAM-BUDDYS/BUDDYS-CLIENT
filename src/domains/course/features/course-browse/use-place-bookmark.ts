import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';

import {
  PLACE_MUTATION_OPTIONS,
  type UpdatePlaceBookmarkVariables,
} from '@/domains/course/api/query';
import type { BookmarkedPlaceMarkers, Place } from '@/domains/course/api/type';
import { PLACE_QUERY_KEY } from '@/shared/api';

interface UsePlaceBookmarkParams {
  onBookmarkChange: (placeId: string, bookmarked: boolean) => void;
}

interface PlaceSearchPage {
  places: Place[];
  nextPageToken: string | null;
}

export const usePlaceBookmark = ({
  onBookmarkChange,
}: UsePlaceBookmarkParams) => {
  const queryClient = useQueryClient();
  const pendingPlaceIdsRef = useRef(new Set<string>());
  const [pendingPlaceIds, setPendingPlaceIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
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
      queryClient.setQueriesData<InfiniteData<PlaceSearchPage>>(
        { queryKey: PLACE_QUERY_KEY.SEARCH_ALL() },
        (data) =>
          data && {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              places: page.places.map((place) =>
                place.placeId === placeId ? { ...place, bookmarked } : place,
              ),
            })),
          },
      );

      if (!bookmarked) {
        queryClient.setQueriesData<BookmarkedPlaceMarkers>(
          { queryKey: PLACE_QUERY_KEY.BOOKMARK_MARKERS_ALL() },
          (markers) =>
            markers && {
              ...markers,
              places: markers.places.filter(
                (place) => place.placeId !== placeId,
              ),
            },
        );
      }

      onBookmarkChange(placeId, bookmarked);
      void queryClient.invalidateQueries({
        queryKey: PLACE_QUERY_KEY.BOOKMARKS_ALL(),
      });
    },
  });
  const { mutateAsync } = mutation;
  const updateBookmark = useCallback(
    async (variables: UpdatePlaceBookmarkVariables) => {
      const { placeId, nextBookmarked } = variables;

      if (pendingPlaceIdsRef.current.has(placeId)) {
        return nextBookmarked;
      }

      pendingPlaceIdsRef.current.add(placeId);
      setPendingPlaceIds(new Set(pendingPlaceIdsRef.current));

      try {
        return await mutateAsync(variables);
      } finally {
        pendingPlaceIdsRef.current.delete(placeId);
        setPendingPlaceIds(new Set(pendingPlaceIdsRef.current));
      }
    },
    [mutateAsync],
  );

  return {
    isPending: pendingPlaceIds.size > 0,
    pendingPlaceIds,
    updateBookmark,
  };
};

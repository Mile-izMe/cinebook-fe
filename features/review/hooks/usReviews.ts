import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { reviewApi } from "../api";

export const useReviews = (movieId: string) => {
  return useInfiniteQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: ({ pageParam }) =>
      reviewApi.getReviews(movieId, {
        cursor: pageParam,
        limit: 5,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta?.hasMore ? lastPage.meta.nextCursor : undefined,
    placeholderData: keepPreviousData,
  });
};

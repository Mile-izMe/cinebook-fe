import { useInfiniteQuery } from "@tanstack/react-query";
import { movieApi } from "../api";

export const useMovies = (keyword?: string, genreId?: string) => {
  return useInfiniteQuery({
    queryKey: ["movie", keyword, genreId],
    queryFn: ({ pageParam }) =>
      movieApi.getListMovies({ keyword, genreId, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta?.hasMore ? lastPage.meta.nextCursor : undefined,
  });
};

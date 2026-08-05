import { useQuery } from "@tanstack/react-query";
import { movieApi } from "../api";

export const useMovieDetail = (id: string) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieApi.getMovieDetail(id),
    enabled: !!id,
  });
};

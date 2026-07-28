import { useQuery } from "@tanstack/react-query";
import { movieApi } from "../api";

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => movieApi.getGenre(),
    staleTime: 60 * 60 * 1000,
  });
};

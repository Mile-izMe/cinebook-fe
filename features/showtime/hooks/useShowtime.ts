import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { showtimeApi, ShowtimeQueryParams } from "../api";

export const useShowtimes = (movieId: string, params: ShowtimeQueryParams) => {
  return useQuery({
    queryKey: ["showtimes", movieId, params],
    queryFn: () => showtimeApi.getShowtimes(movieId, params),
    enabled: !!movieId && !!params.cityId,
    staleTime: 60 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

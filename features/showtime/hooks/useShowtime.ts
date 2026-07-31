import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { showtimeApi, ShowtimeQueryParams } from "../api";

export const showtimeKeys = {
  all: ["showtimes"] as const,

  movie: (movieId: string) => [...showtimeKeys.all, movieId] as const,

  list: (movieId: string, params: ShowtimeQueryParams) =>
    [...showtimeKeys.movie(movieId), params] as const,
};

export const useShowtimes = (movieId: string, params: ShowtimeQueryParams) => {
  return useQuery({
    queryKey: showtimeKeys.list(movieId, params),

    queryFn: () => showtimeApi.getShowtimes(movieId, params),

    enabled: Boolean(movieId && params.cityId),

    staleTime: 1000 * 60 * 60,

    placeholderData: keepPreviousData,
  });
};

// export const useShowtimes = (movieId: string, params: ShowtimeQueryParams) => {
//   return useQuery({
//     queryKey: ["showtimes", movieId, params],
//     queryFn: () => showtimeApi.getShowtimes(movieId, params),
//     enabled: !!movieId && !!params.cityId,
//     staleTime: 60 * 60 * 1000,
//     placeholderData: keepPreviousData,
//   });
// };

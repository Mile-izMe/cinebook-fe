import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { Showtime } from "../types";

export interface ShowtimeQueryParams {
  cityId: string | null;
  cinemaId: string | null;
  format: string | null;
  date: string | null;
}
export const showtimeApi = {
  getShowtimes: (
    movieId: string,
    params: ShowtimeQueryParams,
  ): Promise<ApiResponse<Showtime[]>> =>
    api.get(`/api/movies/${movieId}/showtimes`, {
      params,
    }),
};

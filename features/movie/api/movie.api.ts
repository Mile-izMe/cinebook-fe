import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { CreateMovieInput, UpdateMovieInput } from "../validation";
import {
  GenreResponse,
  MovieSummaryResponse,
  MovieDetailResponse,
} from "../types";

export interface MovieSearchParams {
  keyword?: string;
  genreId?: string;
  cursor?: string;
  limit?: number;
}

export const movieApi = {
  getGenre: (): Promise<ApiResponse<GenreResponse[]>> => api.get("/api/genres"),

  createMovie: (
    data: CreateMovieInput,
  ): Promise<ApiResponse<MovieSummaryResponse>> =>
    api.post("/api/movies", data),

  updateMovie: (
    id: string,
    data: UpdateMovieInput,
  ): Promise<ApiResponse<MovieSummaryResponse>> =>
    api.put(`/api/movies/${id}`, data),

  deleteMovie: (id: string): Promise<void> => api.put(`/api/movies/${id}`),

  getListMovies: (
    params: MovieSearchParams,
  ): Promise<ApiResponse<MovieSummaryResponse[]>> =>
    api.get("/api/movies", {
      params,
    }),

  getMovieDetail: (id: string): Promise<ApiResponse<MovieDetailResponse>> =>
    api.get(`/api/movies/${id}`),
};

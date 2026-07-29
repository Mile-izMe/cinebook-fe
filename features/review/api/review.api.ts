import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { ReviewResponse } from "../types";
import { CreateReviewInput } from "../validation";

export interface ReviewSearchParams {
  cursor?: string;
  limit?: number;
}

export const reviewApi = {
  getReviews: (
    movieId: string,
    params: ReviewSearchParams,
  ): Promise<ApiResponse<ReviewResponse[]>> =>
    api.get(`/api/movies/${movieId}/reviews`, {
      params,
    }),

  createReview: (
    movieId: string,
    data: CreateReviewInput,
  ): Promise<ApiResponse<ReviewResponse>> =>
    api.post(`/api/movies/${movieId}/reviews`, data),
};

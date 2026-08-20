import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { Cinema } from "../types";
import { CreateCinemaInput, UpdateCinemaInput } from "../validation";

export const cinemaApi = {
  getCinemas: (cityId?: string): Promise<ApiResponse<Cinema[]>> =>
    api.get("/api/cinemas", {
      params: {
        cityId,
      },
    }),

  getCinemaDetail: (id: string): Promise<ApiResponse<Cinema>> =>
    api.get(`/api/cinemas/${id}`),

  createCinema: (data: CreateCinemaInput): Promise<ApiResponse<Cinema>> =>
    api.post("/api/cinemas", data),

  updateCinema: (data: UpdateCinemaInput): Promise<ApiResponse<Cinema>> =>
    api.put("/api/cinemas", data),

  deleteCinema: (id: string): Promise<void> => api.delete(`/api/cinemas/${id}`),
};

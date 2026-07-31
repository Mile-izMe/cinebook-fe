import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { CityResponse } from "../types";
import { CreateCityInput, UpdateCityInput } from "../validation";

export const cityApi = {
  getCities: (): Promise<ApiResponse<CityResponse[]>> => api.get("/api/cities"),

  getCityDetail: (id: string): Promise<ApiResponse<CityResponse>> =>
    api.get(`/api/cities/${id}`),

  createCity: (data: CreateCityInput): Promise<ApiResponse<CityResponse>> =>
    api.post("/api/cities", data),

  updateCity: (data: UpdateCityInput): Promise<ApiResponse<CityResponse>> =>
    api.put("/api/cities", data),

  deleteCity: (id: string): Promise<void> => api.put(`/api/cities/${id}`),
};

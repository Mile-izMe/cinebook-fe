import { MeResponse } from "@/features/auth";
import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { UserStats } from "../types";
import { UpdateProfileInput } from "./../validation";

export const userApi = {
  getStats: (): Promise<ApiResponse<UserStats>> => api.get("/api/users/stats"),

  updateProfile: (data: UpdateProfileInput): Promise<ApiResponse<MeResponse>> =>
    api.put("/api/users/profile", data),
};

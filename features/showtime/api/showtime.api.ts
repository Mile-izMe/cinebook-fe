import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { LoginInput, RefreshTokenInput, RegisterInput } from "../validation";

export const showtimeApi = {
  login: (data: LoginInput): Promise<ApiResponse<AuthResponse>> =>
    api.post("/api/auth/login", data),

  register: (data: RegisterInput): Promise<ApiResponse<RegisterResponse>> =>
    api.post("/api/auth/register", data),

  verifyEmail: (token: string): Promise<void> =>
    api.post(`/api/auth/verify-email?token=${token}`),

  getMe: (): Promise<ApiResponse<MeResponse>> => api.get("/api/auth/me"),

  refreshToken: (data: RefreshTokenInput): Promise<ApiResponse<AuthResponse>> =>
    api.post("/api/auth/refresh", data),

  logout: (): Promise<{ message: string }> => api.post("/api/auth/logout"),
};

import { ApiErrorResponse } from "@/types";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { v4 as uuidv4 } from "uuid";
import { tokenStorage } from "./token-storage";
import { isTokenExpiringSoon } from "./tokenUtil";
import { refreshAccessToken } from "./refreshToken";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

const getDeviceId = () => {
  if (typeof window === "undefined") return null;

  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
};

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window === "undefined") {
      return config;
    }

    let token = tokenStorage.getAccessToken();

    // Refresh before expires
    if (
      token &&
      !config.url?.includes("/api/auth/refresh") &&
      isTokenExpiringSoon(token, 120)
    ) {
      try {
        token = await refreshAccessToken();
      } catch {
        tokenStorage.clearTokens();
        window.location.href = "/login";
        return Promise.reject(new Error("Unable to refresh access token"));
      }
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const deviceId = getDeviceId();

    if (deviceId && config.headers) {
      config.headers["X-Device-ID"] = deviceId;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Fallback: server res 401
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        tokenStorage.clearTokens();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data as ApiErrorResponse);
    }

    return Promise.reject(error);
  },
);

export default api;

import { ApiErrorResponse } from "@/types";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { v4 as uuidv4 } from "uuid";
import { tokenStorage } from "./token-storage";

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

// Handle API concurrency when token expired
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 1. Interceptor Request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = tokenStorage.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Automatically attach X-Device-ID to every request
      const deviceId = getDeviceId();
      if (deviceId && config.headers) {
        config.headers["X-Device-ID"] = deviceId;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Interceptor Response
api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Catch 401 & request first time retry
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // If CURRENTLY refresh token, move other request with 401 into queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) {
          throw new Error("Refresh Token not found in localStorage!");
        }

        const response = await axios.post(`${baseURL}/api/auth/refresh`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data;

        tokenStorage.setTokens(newAccessToken, newRefreshToken);

        processQueue(null, newAccessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token failed (VD: refreshToken expired) -> Logout
        processQueue(refreshError as AxiosError, null);

        tokenStorage.clearTokens();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response && error.response.data) {
      const apiError = error.response.data as ApiErrorResponse;
      return Promise.reject(apiError);
    }

    return Promise.reject(error);
  },
);

export default api;

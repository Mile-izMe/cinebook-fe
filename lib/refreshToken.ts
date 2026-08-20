import axios from "axios";
import { tokenStorage } from "./token-storage";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

let refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await axios.post(`${baseURL}/api/auth/refresh`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    tokenStorage.setTokens(accessToken, newRefreshToken);

    return accessToken;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
};

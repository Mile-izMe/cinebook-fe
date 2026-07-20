import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";
import { useEffect } from "react";
import { useAuthStore } from "../store";

export const useMe = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const query = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
    // Call API if cookie has token
    enabled: typeof window !== "undefined" && !!localStorage.get("accessToken"),
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setAuth(query.data.data);
    }
  }, [query.isSuccess, query.data, setAuth]);

  useEffect(() => {
    if (query.isError) {
      clearAuth();
    }
  }, [query.isError, clearAuth]);

  return query;
};

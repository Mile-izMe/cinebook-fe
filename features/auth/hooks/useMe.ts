import { tokenStorage } from "@/lib";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { authApi } from "../api";

export const useMe = () => {
  const setAuth = useAuthStore((a) => a.setAuth);
  const clearAuth = useAuthStore((a) => a.clearAuth);
  const setLoading = useAuthStore((a) => a.setLoading);

  const hasToken =
    typeof window !== "undefined" && !!tokenStorage.getAccessToken();

  const query = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
    enabled: hasToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!hasToken) {
      clearAuth();
      return;
    }
    if (query.isPending) setLoading();
    if (query.isSuccess) setAuth(query.data.data);
    if (query.isError) {
      tokenStorage.clearTokens();
      clearAuth();
    }
  }, [hasToken, query.isPending, query.isSuccess, query.isError, query.data]);

  return query;
};

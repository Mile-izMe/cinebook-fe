import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";
import { useEffect } from "react";
import { useAuthStore } from "../store";
import { tokenStorage } from "@/lib";

export const useMe = () => {
  const { setAuth, clearAuth, setLoading } = useAuthStore();
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

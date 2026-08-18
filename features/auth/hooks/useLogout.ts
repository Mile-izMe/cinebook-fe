import { tokenStorage } from "@/lib/token-storage";
import { ApiErrorResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api";
import { useAuthStore } from "@/store";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((a) => a.clearAuth);

  return useMutation({
    mutationFn: () => authApi.logout(),

    onSettled: () => {
      tokenStorage.clearTokens();
      clearAuth();
      queryClient.removeQueries({ queryKey: ["me"] });
      router.push("/");
    },

    onError: (error: ApiErrorResponse) => {
      console.log(
        "Logout API failed (client-side logout still proceeds):",
        error.errorCode,
      );
    },
  });
};

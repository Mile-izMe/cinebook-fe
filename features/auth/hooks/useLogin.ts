import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginInput } from "../validation";
import { authApi } from "../api";
import { toast } from "sonner";
import { ApiErrorResponse } from "@/types";
import { tokenStorage } from "@/lib";
import { useAuthStore } from "../store";

export const useLogin = () => {
  //   const t = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),

    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response.data;
      tokenStorage.setTokens(accessToken, refreshToken);

      toast.success(response.message /* || t("login_success") */);

      const me = await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: authApi.getMe,
      });
      setAuth(me.data);

      router.push("/");
    },

    onError: (error: ApiErrorResponse) => {
      console.log("Login failed with code:", error.errorCode);
    },
  });
};

import { tokenStorage } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../api";
import { useAuthStore } from "../store";
import { LoginInput } from "../validation";

export const useLogin = () => {
  const t = useTranslations("auth");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),

    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response.data;
      tokenStorage.setTokens(accessToken, refreshToken);

      toast.success(response.message || t("login_success"));

      const me = await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: authApi.getMe,
      });
      setAuth(me.data);

      router.push("/");
    },
  });
};

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginInput } from "../validation";
import { authApi } from "../api";
import { toast } from "sonner";
import { ApiErrorResponse } from "@/types";

export const useLogin = () => {
  //   const t = useTranslation();
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),

    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;

      localStorage.set("accessToken", accessToken);
      localStorage.set("refreshToken", refreshToken);

      toast.success(response.message /* || t("login_success") */);

      queryClient.invalidateQueries({ queryKey: ["me"] });

      router.push("/");
    },

    onError: (error: ApiErrorResponse) => {
      console.log("Login failed with code:", error.errorCode);
    },
  });
};

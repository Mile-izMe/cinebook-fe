import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { userApi } from "../api";
import { UpdateProfileInput } from "../validation";
import { ApiResponse } from "@/types";
import { MeResponse } from "@/features/auth";
import { useAuthStore } from "@/store";

export const useUpdateProfile = () => {
  const t = useTranslations("user");
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((a) => a.setAuth);

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => userApi.updateProfile(data),

    onSuccess: async () => {
      toast.success(t("update_profile_success"));
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      const me = queryClient.getQueryData<ApiResponse<MeResponse>>(["me"]);
      if (me?.data) {
        setAuth(me.data);
      }
    },

    onError: () => {
      toast.error(t("update_profile_fail"));
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../api";
import { RegisterInput } from "../validation";

export const useRegister = () => {
  const tAuth = useTranslations("auth");
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),

    onSuccess: async () => {
      toast.success(tAuth("register_success"));

      router.push("/login");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { paymentApi } from "../api";

export const useMockPaymentSuccess = () => {
  const t = useTranslations("payment");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: string) => paymentApi.mockSuccess(paymentId),
    onSuccess: () => {
      toast.success(t("mock_success"));
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: () => {
      toast.error(t("mock_success_fail"));
    },
  });
};

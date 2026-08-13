import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { paymentApi } from "../api";

export const useMockPaymentFailed = () => {
  const t = useTranslations("payment");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: string) => paymentApi.mockFailed(paymentId),
    onSuccess: () => {
      toast.success(t("mock_failed_success"));
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: () => {
      toast.error(t("mock_failed_fail"));
    },
  });
};

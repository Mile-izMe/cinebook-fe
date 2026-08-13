import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { CreatePaymentInput } from "../validations";
import { paymentApi } from "../api";

interface CreatePaymentPayload {
  bookingId: string;
  request: CreatePaymentInput;
}

export const useCreatePayment = () => {
  const t = useTranslations("payment");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaymentPayload) =>
      paymentApi.createPayment(payload.bookingId, payload.request),
    onSuccess: () => {
      toast.success(t("create_payment_success"));
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: () => {
      toast.error(t("create_payment_fail"));
    },
  });
};

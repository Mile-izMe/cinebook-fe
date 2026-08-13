import { ApiErrorResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { bookingApi } from "../api";
import { CreateBookingInput } from "../validations";

export const useCreateBooking = () => {
  const t = useTranslations("booking");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingInput) => bookingApi.createBooking(data),
    onSuccess: () => {
      toast.success(t("create_booking_success"));
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error: ApiErrorResponse) => {
      const errorCode = error.errorCode;
      const messageKey = errorCode ? `errors.${errorCode}` : "errors.default";
      toast.error(t(messageKey));
    },
  });
};

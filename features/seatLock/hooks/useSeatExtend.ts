import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { seatLockApi } from "../api";
import { SeatExtendInput } from "../validations";

export const useSeatExtend = () => {
  const t = useTranslations("seatLock");

  return useMutation({
    mutationFn: (data: SeatExtendInput) => seatLockApi.extendLockTime(data),
    onSuccess: () => {
      toast.success(t("extend_seat_success"));
    },
    onError: () => {
      toast.error(t("extend_seat_fail"));
    },
  });
};

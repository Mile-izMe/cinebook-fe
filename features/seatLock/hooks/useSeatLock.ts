import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { seatLockApi } from "../api";
import { SeatLockingInput } from "../validations";

export const useSeatLock = () => {
  const t = useTranslations("seatLock");

  return useMutation({
    mutationFn: (data: SeatLockingInput) => seatLockApi.lockSeat(data),
    onSuccess: () => {
      toast.success(t("lock_seat_success"));
    },
    onError: () => {
      toast.error(t("lock_seat_fail"));
    },
  });
};

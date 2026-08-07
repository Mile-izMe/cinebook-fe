import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { seatLockApi } from "../api";
import { SeatUnlockingInput } from "../validations";

export const useSeatUnlock = () => {
  const t = useTranslations("seatLock");

  return useMutation({
    mutationFn: (data: SeatUnlockingInput) => seatLockApi.unlockSeat(data),
    onSuccess: () => {
      toast.success(t("unlock_seat_success"));
    },
    onError: () => {
      toast.error(t("unlock_seat_fail"));
    },
  });
};

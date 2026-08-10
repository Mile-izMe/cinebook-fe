import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { seatLockApi } from "../api";
import { SeatLockingInput } from "../validations";
import { useBookingStore } from "@/store";

export const useSeatLock = () => {
  const t = useTranslations("seatLock");
  const setMaxExpiresAt = useBookingStore((s) => s.setMaxExpiresAt);

  return useMutation({
    mutationFn: (data: SeatLockingInput) => seatLockApi.lockSeat(data),
    onSuccess: () => {
      toast.success(t("lock_seat_success"));
      const maxExpiresAtMs = Date.now() + 15 * 60 * 1000;
      setMaxExpiresAt(maxExpiresAtMs);
    },
    onError: () => {
      toast.error(t("lock_seat_fail"));
    },
  });
};

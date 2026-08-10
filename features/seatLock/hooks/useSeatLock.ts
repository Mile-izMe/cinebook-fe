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
    onSuccess: (response) => {
      toast.success(t("lock_seat_success"));
      const maxExpiresAtMs = new Date(response.data[0].expiresAt).getTime();
      setMaxExpiresAt(maxExpiresAtMs);
    },
    onError: () => {
      toast.error(t("lock_seat_fail"));
    },
  });
};

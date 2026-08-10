import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { seatLockApi } from "../api";
import { SeatUnlockingInput } from "../validations";

export const useSeatUnlock = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("seatLock");

  return useMutation({
    mutationFn: (data: SeatUnlockingInput) => seatLockApi.unlockSeat(data),
    onSuccess: (_, variables) => {
      toast.success(t("unlock_seat_success"));

      const releasedSeatIds = Object.keys(variables.seatTokens);
      queryClient.setQueryData<{ data: string[] }>(
        ["locked-seats", variables.showtimeId],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((id) => !releasedSeatIds.includes(id)),
          };
        },
      );
    },
    onError: () => {
      toast.error(t("unlock_seat_fail"));
    },
  });
};

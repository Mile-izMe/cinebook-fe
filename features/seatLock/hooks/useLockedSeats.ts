import { useQuery } from "@tanstack/react-query";
import { seatLockApi } from "../api";

export const useLockedSeats = (showtimeId: string) => {
  return useQuery({
    queryKey: ["locked-seats", showtimeId],
    queryFn: () => seatLockApi.getLockedSeats(showtimeId),
    enabled: !!showtimeId,
    staleTime: Infinity,
  });
};

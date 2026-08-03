import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { bookingApi } from "../api";

export const useSeatMap = (showtimeId: string) => {
  return useQuery({
    queryKey: ["seatmap", showtimeId],

    queryFn: () => bookingApi.getSeatMap(showtimeId),

    enabled: !!showtimeId,

    staleTime: 1000 * 60 * 60, // Cache 5 minutes

    placeholderData: keepPreviousData,
  });
};

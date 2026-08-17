import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../api";

export const useGetBookingStatus = (id: string) => {
  return useQuery({
    queryKey: ["booking-status", id],
    queryFn: () => bookingApi.getBookingStatus(id),
    enabled: !!id,
    refetchInterval: (query) => {
      const status = query.state.data;
      if (status === "PENDING") {
        return 2000;
      }
      return false;
    },
  });
};

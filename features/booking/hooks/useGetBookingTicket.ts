import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../api";

export const useGetBookingTicket = (id: string) => {
  return useQuery({
    queryKey: ["booking-ticket", id],
    queryFn: () => bookingApi.getBookingTicket(id),
    enabled: !!id,
  });
};

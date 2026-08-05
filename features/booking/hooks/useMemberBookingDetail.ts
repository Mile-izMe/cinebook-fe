import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../api";

export const useMemberBookingDetail = (id: string) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => bookingApi.getBookingDetail(id),
    enabled: !!id,
  });
};

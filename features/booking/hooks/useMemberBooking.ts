import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { bookingApi } from "../api";

export const useMemberBooking = () => {
  return useInfiniteQuery({
    queryKey: ["bookings"],
    queryFn: ({ pageParam }) =>
      bookingApi.getBookingHistory({ cursor: pageParam, limit: 5 }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta?.hasMore ? lastPage.meta.nextCursor : undefined,
    placeholderData: keepPreviousData,
  });
};

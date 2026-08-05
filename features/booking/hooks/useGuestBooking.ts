import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../api";
import { BookingInputForGuest } from "../validations";

export const useGuestBooking = (data: BookingInputForGuest) => {
  return useQuery({
    queryKey: ["booking", data.bookingCode],
    queryFn: () => bookingApi.lookupBooking(data),
  });
};

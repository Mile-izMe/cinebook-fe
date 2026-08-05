import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../api";
import { BookingInputForGuest } from "../validations";

export const useGuestCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: BookingInputForGuest) =>
      bookingApi.cancelBookingGuest(request),

    onSuccess: (_, request) => {
      queryClient.invalidateQueries({
        queryKey: ["booking", request.bookingCode],
      });
    },
  });
};

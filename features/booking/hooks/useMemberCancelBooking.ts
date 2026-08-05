import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../api";

export const useMemberCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingApi.cancelBooking(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    },
  });
};

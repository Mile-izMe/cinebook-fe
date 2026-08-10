import { useQueryClient } from "@tanstack/react-query";
import { useSubscription } from "react-stomp-hooks";

interface SeatEvent {
  type: "SEAT_LOCKED" | "SEAT_RELEASED";
  seatId: string;
}

export const useSeatWebsocket = (showtimeId: string) => {
  const queryClient = useQueryClient();

  // Subcribe into topic of specific showtime
  // Argument 1: Channel
  // Argument 2: Function when there's new message
  useSubscription(`topic/showtimes/${showtimeId}/seats`, (message) => {
    if (message.body) {
      const event: SeatEvent = JSON.parse(message.body);

      queryClient.setQueryData<{ data: string[] }>(
        ["locked-seats", showtimeId],
        (oldData) => {
          if (!oldData) return oldData;
          const currentLockedSeats = oldData.data;

          if (event.type === "SEAT_LOCKED") {
            return {
              ...oldData,
              data: Array.from(new Set([...currentLockedSeats, event.seatId])),
            };
          }

          if (event.type === "SEAT_RELEASED") {
            return {
              ...oldData,
              data: currentLockedSeats.filter((id) => id !== event.seatId),
            };
          }

          return oldData;
        },
      );
    }
  });
};

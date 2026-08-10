/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useSubscription } from "react-stomp-hooks";

interface SeatEvent {
  type: "SEAT_LOCKED" | "SEAT_RELEASED";
  seat: string;
}

export const useSeatWebsocket = (showtimeId: string) => {
  const queryClient = useQueryClient();

  const topicDestination = `/topic/showtimes/${showtimeId}/seats`;

  const handleMessage = useCallback(
    (message: any) => {
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
                data: Array.from(new Set([...currentLockedSeats, event.seat])),
              };
            }

            if (event.type === "SEAT_RELEASED") {
              return {
                ...oldData,
                data: currentLockedSeats.filter((id) => id !== event.seat),
              };
            }

            return oldData;
          },
        );
      }
    },
    [queryClient, showtimeId],
  );

  // Subcribe into topic of specific showtime
  // Argument 1: Channel
  // Argument 2: Function when there's new message
  useSubscription(topicDestination, handleMessage);
};

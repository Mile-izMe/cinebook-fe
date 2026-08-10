import { SeatMapSeat } from "@/features/booking";
import { create } from "zustand";

interface BookingStore {
  selectedSeats: SeatMapSeat[];
  seatTokens: Record<string, string>;
  setSeatTokens: (tokens: Record<string, string>) => void;
  toggleSeat: (seat: SeatMapSeat) => void;
  clearSeats: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  selectedSeats: [],
  seatTokens: {},

  setSeatTokens: (tokens) => set({ seatTokens: tokens }),

  toggleSeat: (seat) =>
    set((state) => {
      const exists = state.selectedSeats.some((s) => s.seatId === seat.seatId);

      if (exists) {
        // CASE 1: CANCEL BOOKING CHAIR
        // Remove that chair from selectedSeats
        const updatedSeats = state.selectedSeats.filter(
          (s) => s.seatId !== seat.seatId,
        );

        // Remove token of that chair
        const updatedTokens = { ...state.seatTokens };
        delete updatedTokens[seat.seatId];

        return {
          selectedSeats: updatedSeats,
          seatTokens: updatedTokens,
        };
      }
      if (state.selectedSeats.length >= 6) return state; // limit 6 chairs
      return { selectedSeats: [...state.selectedSeats, seat] };
    }),

  clearSeats: () => set({ selectedSeats: [], seatTokens: {} }),
}));

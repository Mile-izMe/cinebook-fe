import { SeatMapSeat } from "@/features/booking";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BookingStore {
  selectedSeats: SeatMapSeat[];
  seatTokens: Record<string, string>;
  maxExpiresAt: number | null;
  setSeatTokens: (tokens: Record<string, string>) => void;
  setMaxExpiresAt: (ts: number) => void;
  toggleSeat: (seat: SeatMapSeat) => void;
  clearSeats: () => void;

  clearStore: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      selectedSeats: [],
      seatTokens: {},
      maxExpiresAt: null,

      setMaxExpiresAt: (ts) => set({ maxExpiresAt: ts }),

      setSeatTokens: (tokens) => set({ seatTokens: tokens }),

      toggleSeat: (seat) =>
        set((state) => {
          const exists = state.selectedSeats.some(
            (s) => s.seatId === seat.seatId,
          );

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

      clearStore: () =>
        set({
          selectedSeats: [],
          seatTokens: {},
          maxExpiresAt: null,
        }),
    }),
    {
      name: "cinebook-session-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

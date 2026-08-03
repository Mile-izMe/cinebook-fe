import { SeatMapSeat } from "@/features/booking";
import { create } from "zustand";

interface BookingStore {
  selectedSeats: SeatMapSeat[];
  toggleSeat: (seat: SeatMapSeat) => void;
  clearSeats: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  selectedSeats: [],
  toggleSeat: (seat) =>
    set((state) => {
      const exists = state.selectedSeats.some((s) => s.seatId === seat.seatId);
      if (exists) {
        return {
          selectedSeats: state.selectedSeats.filter(
            (s) => s.seatId !== seat.seatId,
          ),
        };
      }
      if (state.selectedSeats.length >= 6) return state; // limit 6 chairs
      return { selectedSeats: [...state.selectedSeats, seat] };
    }),
  clearSeats: () => set({ selectedSeats: [] }),
}));

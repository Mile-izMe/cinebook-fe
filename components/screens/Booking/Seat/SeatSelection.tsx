"use client";

import {
  CinemaSummary,
  MovieSummary,
  RoomSummary,
  useSeatMap,
} from "@/features/booking";
import BookingBreadcrumb from "../BookingBreadcrumb";
import { useBookingStore } from "@/store";
import SeatMapPanel from "./SeatMapPanel";

interface ShowtimeSelectionProps {
  showtimeId: string;
}

export default function SeatSelection({ showtimeId }: ShowtimeSelectionProps) {
  const { data, isLoading } = useSeatMap(showtimeId);
  const seatMap = data?.data;
  const selectedSeats = useBookingStore((s) => s.selectedSeats);
  const toggleSeat = useBookingStore((s) => s.toggleSeat);

  if (!seatMap) return null;

  const movieData: MovieSummary = seatMap.movie;
  const cinemaData: CinemaSummary = seatMap.cinema;
  const roomData: RoomSummary = seatMap.room;

  return (
    <div className="grow bg-brand-black pb-20">
      {/* Top Breadcrumb Header */}
      <BookingBreadcrumb movieId={movieData.id} currentStep={2} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <SeatMapPanel
            isLoading={isLoading}
            rows={seatMap.rows}
            selectedSeats={selectedSeats}
            onSeatSelect={toggleSeat}
          />
        </div>
      </div>
    </div>
  );
}

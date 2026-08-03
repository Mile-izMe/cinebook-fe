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
import BookingSummary from "./BookingSummary";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ShowtimeSelectionProps {
  showtimeId: string;
}

export default function SeatSelection({ showtimeId }: ShowtimeSelectionProps) {
  const router = useRouter();
  const { data, isLoading } = useSeatMap(showtimeId);
  const seatMap = data?.data;
  const selectedSeats = useBookingStore((s) => s.selectedSeats);
  const toggleSeat = useBookingStore((s) => s.toggleSeat);
  const { clearSeats } = useBookingStore();

  if (!seatMap) return null;

  const movieData: MovieSummary = seatMap.movie;
  const cinemaData: CinemaSummary = seatMap.cinema;
  const roomData: RoomSummary = seatMap.room;

  const handleCheckoutRedirect = () => {
    if (selectedSeats.length === 0) {
      toast.info("Please select at least one seat to continue.");
      return;
    }
    router.push("/checkout");
  };

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
            clearSeats={() => clearSeats}
          />

          <BookingSummary
            movieSummary={movieData}
            cinemaSummary={cinemaData}
            selectedSeats={selectedSeats}
            onNext={handleCheckoutRedirect}
            nextText="Go to Checkout"
            disableNext={selectedSeats.length === 0}
          />
        </div>
      </div>
    </div>
  );
}

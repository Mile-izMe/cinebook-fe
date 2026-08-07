"use client";

import { CinemaSummary, MovieSummary, useSeatMap } from "@/features/booking";
import { useBookingStore } from "@/store";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import BookingBreadcrumb from "../BookingBreadcrumb";
import BookingSummary from "../BookingSummary";
import SeatMapPanel from "./SeatMapPanel";

interface ShowtimeSelectionProps {
  showtimeId: string;
}

export default function SeatSelection({ showtimeId }: ShowtimeSelectionProps) {
  const router = useRouter();
  const { data, isLoading } = useSeatMap(showtimeId);
  const seatMap = data?.data;

  const selectedSeats = useBookingStore((s) => s.selectedSeats);
  const toggleSeat = useBookingStore((s) => s.toggleSeat);
  const clearSeats = useBookingStore((s) => s.clearSeats);

  const breadcrumbMovie = useMemo(() => {
    if (!seatMap?.movie) return undefined;

    return {
      title: seatMap?.movie.title,
      posterUrl: seatMap?.movie.posterUrl,
      duration: seatMap?.movie.duration,
      genreNames: seatMap?.movie.genreNames,
    };
  }, [seatMap]);

  if (!seatMap) return null;

  const movieData: MovieSummary = seatMap.movie;
  const cinemaData: CinemaSummary = seatMap.cinema;
  // const roomData: RoomSummary = seatMap.room;

  const handleCheckoutRedirect = () => {
    if (selectedSeats.length === 0) {
      toast.info("Please select at least one seat to continue.");
      return;
    }
    router.push(`/checkout/${showtimeId}`);
  };

  return (
    <div className="grow bg-brand-black pb-20">
      {/* Top Breadcrumb Header */}
      <BookingBreadcrumb movie={breadcrumbMovie} currentStep={2} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <SeatMapPanel
            isLoading={isLoading}
            rows={seatMap.rows}
            selectedSeats={selectedSeats}
            onSeatSelect={toggleSeat}
            clearSeats={clearSeats}
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

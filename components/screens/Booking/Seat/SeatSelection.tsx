"use client";

import { CinemaSummary, MovieSummary, useSeatMap } from "@/features/booking";
import { SeatLock } from "@/features/seatLock";
import { useLockedSeats } from "@/features/seatLock/hooks/useLockedSeats";
import { useSeatLock } from "@/features/seatLock/hooks/useSeatLock";
import { useSeatWebsocket } from "@/hooks";
import { useBookingStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
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

  useSeatWebsocket(showtimeId);
  const { data: lockedSeatsResponse } = useLockedSeats(showtimeId);
  const lockedSeatIds = lockedSeatsResponse?.data || [];

  const { mutateAsync: lockSeats, isPending } = useSeatLock();
  const queryClient = useQueryClient();

  const selectedSeats = useBookingStore((s) => s.selectedSeats);
  const seatTokens = useBookingStore((s) => s.seatTokens);
  const setSeatTokens = useBookingStore((s) => s.setSeatTokens);
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

  const handleCheckoutRedirect = async () => {
    if (selectedSeats.length === 0) {
      toast.info("Please select at least one seat to continue.");
      return;
    }
    router.push(`/checkout/${showtimeId}`);

    try {
      const response = await lockSeats({
        showtimeId,
        seatIds: selectedSeats.map((seat) => seat.seatId),
      });

      const tokensRecord = Object.fromEntries(
        response.data.map((item: SeatLock) => [item.seatId, item.lockToken]),
      );

      setSeatTokens(tokensRecord);
      router.push(`/checkout/${showtimeId}`);
    } catch {
      toast.error(
        "One of your seat has been held by another person. Please try again!",
      );
      queryClient.invalidateQueries({ queryKey: ["seatmap", showtimeId] });
    }
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
            lockedSeatIds={lockedSeatIds}
            mySeatTokens={seatTokens}
          />

          <BookingSummary
            movieSummary={movieData}
            cinemaSummary={cinemaData}
            selectedSeats={selectedSeats}
            onNext={handleCheckoutRedirect}
            nextText="Go to Checkout"
            disableNext={selectedSeats.length === 0}
            isNextLoading={isPending}
          />
        </div>
      </div>
    </div>
  );
}

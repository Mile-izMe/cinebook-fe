"use client";

import { useAuthStore } from "@/features/auth";
import { CinemaSummary, MovieSummary, useSeatMap } from "@/features/booking";
import { useBookingStore } from "@/store";
import BookingBreadcrumb from "../BookingBreadcrumb";
import BookingSummary from "../BookingSummary";
import CheckoutOption from "./CheckoutOption";

interface CheckoutSelectionProps {
  showtimeId: string;
}

function CheckoutSelection({ showtimeId }: CheckoutSelectionProps) {
  const { user, status } = useAuthStore();
  const isAuthenticated = status === "authenticated";

  const { data } = useSeatMap(showtimeId);
  const seatMap = data?.data;
  const selectedSeats = useBookingStore((s) => s.selectedSeats);

  if (!seatMap) return null;

  const movieData: MovieSummary = seatMap.movie;
  const cinemaData: CinemaSummary = seatMap.cinema;

  const handleCreateBooking = () => {
    return "OK";
  };

  return (
    <div className="grow bg-brand-black pb-20">
      <BookingBreadcrumb showtimeId={showtimeId} currentStep={3} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <CheckoutOption user={user} isAuthenticated={isAuthenticated} />

          <BookingSummary
            movieSummary={movieData}
            cinemaSummary={cinemaData}
            selectedSeats={selectedSeats}
            onNext={handleCreateBooking}
            nextText="Go to Checkout"
            disableNext={selectedSeats.length === 0}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutSelection;

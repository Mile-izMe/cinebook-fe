"use client";
import { ShowtimePageSkeleton } from "@/components/ui";
import { useMovieDetail } from "@/features/movie";
import { useShowtimes } from "@/features/showtime";
import { useSearchParams } from "next/navigation";
import BookingBreadcrumb from "./BookingBreadcrumb";
import CinemaShowtime from "./CinemaShowtime";
import DateSelection from "./DateSelection";
import SidebarFilters from "./SidebarFilters";

interface ShowtimeSelectionProps {
  movieId: string;
}

function ShowtimeSelection({ movieId }: ShowtimeSelectionProps) {
  const searchParams = useSearchParams();
  const cityId = searchParams.get("cityId") ?? undefined;
  const format = searchParams.get("format") ?? undefined;
  const date = searchParams.get("date") ?? undefined;

  const { data: movieData } = useMovieDetail(movieId);
  const movie = movieData?.data;

  const { data, isLoading } = useShowtimes(movieId, {
    cityId: cityId,
    format: format,
    date,
  });
  const showtimeInfor = data?.data ?? [];
  const groupedCinemasWithShowtimes = showtimeInfor.reduce(
    (acc, s) => {
      (acc[s.cinemaId] ??= {
        name: s.cinemaName,
        showtimes: [],
      }).showtimes.push(s);
      return acc;
    },
    {} as Record<
      string,
      { name: string; showtimes: (typeof showtimeInfor)[number][] }
    >,
  );

  if (isLoading) {
    return <ShowtimePageSkeleton />;
  }

  return (
    <div className="flex-grow bg-brand-black pb-20">
      {/* Top Breadcrumb Header */}
      {movie && <BookingBreadcrumb movie={movie} currentStep={1} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <SidebarFilters />
        <div className="lg:col-span-3 space-y-8">
          <DateSelection />
          <CinemaShowtime
            groupedCinemasWithShowtimes={groupedCinemasWithShowtimes}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowtimeSelection;

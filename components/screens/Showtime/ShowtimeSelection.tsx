"use client";

import { ShowtimePageSkeleton } from "@/components/ui";
import { useMovieDetail } from "@/features/movie";
import { useShowtimes } from "@/features/showtime";
import { useShowtimeFilters } from "@/hooks";
import { groupShowtimesByCinema } from "@/lib";
import { useMemo } from "react";
import BookingBreadcrumb from "./BookingBreadcrumb";
import CinemaShowtime from "./CinemaShowtime";
import DateSelection from "./DateSelection";
import SidebarFilters from "./SidebarFilters";

interface ShowtimeSelectionProps {
  movieId: string;
}

function ShowtimeSelection({ movieId }: ShowtimeSelectionProps) {
  const { filters, updateFilter } = useShowtimeFilters();

  const { data: movieData } = useMovieDetail(movieId);
  const movie = movieData?.data;

  const { data, isLoading } = useShowtimes(movieId, filters);

  const groupedShowtimes = useMemo(
    () => groupShowtimesByCinema(data?.data ?? []),
    [data],
  );

  if (isLoading) {
    return <ShowtimePageSkeleton />;
  }

  return (
    <div className="grow bg-brand-black pb-20">
      {/* Top Breadcrumb Header */}
      {movie && <BookingBreadcrumb movie={movie} currentStep={1} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <SidebarFilters filters={filters} onFiltersChange={updateFilter} />
        <div className="lg:col-span-3 space-y-8">
          <DateSelection
            selectedDate={filters.date}
            onChange={(date) => updateFilter({ date })}
          />
          <CinemaShowtime
            movie={movie}
            date={filters.date}
            cinemaGroups={groupedShowtimes}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowtimeSelection;

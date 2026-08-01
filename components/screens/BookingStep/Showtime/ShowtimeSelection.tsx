"use client";

import { ShowtimePageSkeleton } from "@/components/ui";
import { useCities } from "@/features/city";
import { useShowtimes } from "@/features/showtime";
import { useInitializeShowtimeFilters, useShowtimeFilters } from "@/hooks";
import { groupShowtimesByCinema } from "@/lib";
import { useMemo } from "react";
import BookingBreadcrumb from "../BookingBreadcrumb";
import CinemaShowtime from "./CinemaShowtime";
import DateSelection from "./Filter/DateSelection";
import SidebarFilters from "./Filter/SidebarFilters";

interface ShowtimeSelectionProps {
  movieId: string;
}

function ShowtimeSelection({ movieId }: ShowtimeSelectionProps) {
  const { data: cityData } = useCities();
  const cities = cityData?.data;

  const [filters, setFilters] = useShowtimeFilters();

  useInitializeShowtimeFilters({
    filters,
    setFilters,
    cities,
  });

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
      {movieId && <BookingBreadcrumb movieId={movieId} currentStep={1} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <SidebarFilters
          cities={cities}
          filters={filters}
          onFiltersChange={setFilters}
        />
        <div className="lg:col-span-3 space-y-8">
          <DateSelection
            selectedDate={filters.date}
            onChange={(date) => setFilters({ date })}
          />
          <CinemaShowtime
            date={filters.date ?? undefined}
            cinemaGroups={groupedShowtimes}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowtimeSelection;

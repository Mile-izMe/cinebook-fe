"use client";
import { useState } from "react";
import SidebarFilters from "./SidebarFilters";
import { useShowtimes } from "@/features/showtime";
import { ShowtimePageSkeleton } from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { useMovieDetail } from "@/features/movie";
import BookingBreadcrumb from "./BookingBreadcrumb";
import DateSelection from "./DateSelection";

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

  const { data, isLoading, isError } = useShowtimes(movieId, {
    cityId: cityId,
    format: format,
    // date,
  });
  const showtimeInfor = data?.data ?? [];

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
        </div>
      </div>
    </div>
  );
}

export default ShowtimeSelection;

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export interface BreadcrumbMovieInfo {
  title: string;
  posterUrl: string;
  duration: number;
  genreNames: string[];
}

interface BookingBreadcrumbProps {
  movie?: BreadcrumbMovieInfo;
  showtimeId?: string;
  currentStep?: 1 | 2 | 3;
}

export default function BookingBreadcrumb({
  movie,
  showtimeId,
  currentStep = 1,
}: BookingBreadcrumbProps) {
  const router = useRouter();

  const handleNavigateBack = () => {
    if (currentStep === 1) {
      router.push(`/`);
    } else {
      router.push(`/seat/${showtimeId}`);
    }
  };

  return (
    <div className="bg-brand-dark/40 border-b border-white/5 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        {/* FILM INFOR */}
        {movie !== undefined ? (
          <div className="flex items-center gap-4">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-10 aspect-[2/3] object-cover rounded border border-white/5"
            />
            <div>
              <h2 className="text-xs font-black text-white uppercase tracking-wider">
                {movie.title}
              </h2>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
                {movie.genreNames.join(", ")} • {movie.duration} MINS
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={handleNavigateBack}
            className="cursor-pointer flex items-center gap-2 text-zinc-400 hover:text-white font-black text-[10px] uppercase tracking-widest"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>
              {currentStep == 1 ? "Return To Movie List" : "Return to Seats"}
            </span>
          </button>
        )}

        {/* PROCESS BOOKING (BREADCRUMB) */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
          <span
            className={currentStep >= 1 ? "text-brand-red" : "text-zinc-500"}
          >
            1. Showtime
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />

          <span
            className={currentStep >= 2 ? "text-brand-red" : "text-zinc-500"}
          >
            2. Seats
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />

          <span
            className={currentStep === 3 ? "text-brand-red" : "text-zinc-500"}
          >
            3. Checkout
          </span>
        </div>
      </div>
    </div>
  );
}

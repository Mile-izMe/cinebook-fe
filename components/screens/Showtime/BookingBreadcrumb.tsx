import { MovieDetailResponse } from "@/features/movie";
import { ChevronRight } from "lucide-react";

interface BookingBreadcrumbProps {
  movie: MovieDetailResponse;
  currentStep?: 1 | 2 | 3;
}

export default function BookingBreadcrumb({
  movie,
  currentStep = 1,
}: BookingBreadcrumbProps) {
  return (
    <div className="bg-brand-dark/40 border-b border-white/5 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        {/* THÔNG TIN PHIM */}
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
              {movie.genres.map((genre) => genre.name).join(", ")} •{" "}
              {movie.duration} MINS
            </p>
          </div>
        </div>

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

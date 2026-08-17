"use client";
import { ShowtimePageSkeleton } from "@/components";
import Modal from "@/components/ui/Modal";
import { Calendar, ChevronLeft, Clock, Film, Play, Star } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMovieDetail } from "../../hooks";
import MovieNotFound from "./MovieNotFound";
import TrailerModal from "./TrailerModal";
import MovieReviewSection from "@/features/review/components/MovieReviewSection";
import { useTranslations } from "next-intl";

interface MovieDetailProps {
  id: string;
}

export default function MovieDetail({ id }: MovieDetailProps) {
  const t = useTranslations("movie");
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { data, isLoading, isError } = useMovieDetail(id);
  const router = useRouter();
  const movie = data?.data;
  const videoId = movie?.trailerUrl?.split("?v=")[1]?.split("&")[0];
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`
    : "";

  if (isLoading) {
    return <ShowtimePageSkeleton />;
  }

  if (isError || !movie) {
    return <MovieNotFound />;
  }

  return (
    <div className="grow bg-brand-black pb-20">
      {/* Hero Backdrop Panel */}
      <div className="relative h-[45vh] sm:h-[60vh] w-full overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-brand-black via-brand-black/20 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer flex items-center gap-2 bg-brand-dark/80 hover:bg-zinc-800 text-zinc-300 hover:text-white px-4 py-3 rounded-xl border border-white/5 transition-all font-black text-[10px] uppercase tracking-widest backdrop-blur-md"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t("back")}</span>
          </button>
        </div>

        {/* Play Trailer Floating Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTrailerOpen(true)}
            className="pointer-events-auto flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-brand-red hover:bg-red-700 text-white rounded-full shadow-2xl hover:shadow-brand-red/40 transition-all cursor-pointer focus:outline-none"
          >
            <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
          </motion.button>
        </div>
      </div>

      {/* Movie Details Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Movie Poster */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-48 sm:w-64 aspect-2/3 overflow-hidden rounded-2xl border border-white/5 shadow-2xl shrink-0 self-center md:self-auto bg-brand-dark"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details Column */}
          <div className="flex-1 space-y-6 pt-0 md:pt-12 text-center md:text-left w-full">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <span className="bg-brand-dark border border-white/10 text-zinc-300 font-black text-[10px] uppercase px-2.5 py-1 rounded">
                  {movie.ageRating}
                </span>
                <span className="bg-brand-dark border border-white/10 text-zinc-300 font-black text-[10px] uppercase px-2.5 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-mono">
                    {movie.duration} {t("mins")}
                  </span>
                </span>
                <span className="bg-brand-dark border border-white/10 text-zinc-300 font-black text-[10px] uppercase px-2.5 py-1 rounded flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  {movie.releaseDate}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                {movie.title}
              </h1>

              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 font-black text-sm">
                <Star className="w-4.5 h-4.5 fill-amber-500 text-amber-500" />
                <span className="text-base font-mono">{movie.score}</span>
                <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px] ml-1">
                  / 10 {t("rating")}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="bg-brand-red/10 border border-brand-red/30 text-brand-red font-black text-[10px] px-3.5 py-1.5 rounded uppercase tracking-widest"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              {movie.description}
            </p>

            {/* Crew Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-6 text-xs uppercase tracking-wider font-semibold">
              <div className="space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                  {t("director")}
                </span>
                <p className="text-white font-black">{movie.director}</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                  {t("starring_cast")}
                </span>
                <p className="text-white font-black leading-relaxed">
                  {movie.cast.join(", ")}
                </p>
              </div>
            </div>

            {/* Booking Call to Action */}
            <div className="pt-6">
              <button
                onClick={() => router.push(`/showtimes/${movie.id}`)}
                className="cursor-pointer w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white font-black text-xs uppercase py-4.5 px-10 rounded-xl transition-all shadow-lg active:scale-95 tracking-widest flex items-center justify-center gap-2"
              >
                <Film className="w-4 h-4 fill-white" />
                <span>{t("select_showtime")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <MovieReviewSection movieId={movie.id} />
      </div>

      {/* Trailer Overlay Modal */}
      <Modal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        title={`${movie.title} - ${t("official_movie_trailer")}`}
        maxWidth="4xl"
      >
        <TrailerModal movie={movie} embedUrl={embedUrl} />
      </Modal>
    </div>
  );
}

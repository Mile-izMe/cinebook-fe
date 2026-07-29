"use client";
import { MovieSummaryResponse } from "../types";
import { motion } from "motion/react";
import { Film, Play, Star, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface MovieHeroContentProps {
  selectedMovie: MovieSummaryResponse | null;
  isLoading: boolean;
}

function MovieHeroContent({ selectedMovie, isLoading }: MovieHeroContentProps) {
  const router = useRouter();

  return (
    <div>
      {/* Featured Movie Banner */}
      {selectedMovie && !isLoading ? (
        <div className="relative h-[65vh] sm:h-[75vh] md:h-[80vh] w-full overflow-hidden">
          {/* Backdrop Image */}
          <div className="absolute inset-0">
            <img
              src={selectedMovie.backdropUrl}
              alt={selectedMovie.title}
              className="w-full h-full object-cover opacity-35 scale-102 transform duration-1000"
            />
            {/* Gradients to blend banner into the black page content */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/40 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-10 sm:bottom-20 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-brand-red text-white font-black text-[10px] uppercase px-3 py-1.5 rounded shadow-lg tracking-widest">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                  Spotlight
                </span>
                <span className="text-white text-[10px] font-black bg-black border border-white/10 px-2.5 py-1 rounded uppercase tracking-wider">
                  {selectedMovie.ageRating}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase max-w-4xl leading-tight">
                {selectedMovie.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-zinc-300 uppercase tracking-widest font-black">
                <div className="flex items-center gap-1 text-amber-500 font-black font-mono">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{selectedMovie.score} IMDB</span>
                </div>
                <span>•</span>
                <span className="font-mono">{selectedMovie.duration} MINS</span>
                <span>•</span>
                <span className="text-zinc-400">
                  {selectedMovie.genres.map((g) => g.name).join(" / ")}
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal"
            >
              {selectedMovie.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <button
                onClick={() => router.push(`/movie/${selectedMovie.id}`)}
                className="cursor-pointer flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-black py-4 px-8 rounded-xl transition-all shadow-lg active:scale-95 text-xs uppercase tracking-widest"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Book Tickets</span>
              </button>
              <button
                onClick={() => router.push(`/movie/${selectedMovie.id}`)}
                className="cursor-pointer flex items-center gap-2 bg-brand-dark hover:bg-zinc-800 border border-white/5 text-zinc-200 hover:text-white font-black py-4 px-8 rounded-xl transition-all active:scale-95 text-xs uppercase tracking-widest"
              >
                <span>Read Details</span>
              </button>
            </motion.div>
          </div>
        </div>
      ) : (
        /* Film not found -> Fallback UI */
        !isLoading && (
          <div className="relative h-[65vh] sm:h-[75vh] md:h-[80vh] w-full flex flex-col items-center justify-center bg-black/50 border-b border-white/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <Film className="w-16 h-16 text-zinc-700 mx-auto opacity-50" />
              <h1 className="text-xl sm:text-3xl font-black text-zinc-500 tracking-widest uppercase">
                No Movies Found
              </h1>
              <p className="text-zinc-600 text-xs sm:text-sm uppercase tracking-wider font-bold">
                Try adjusting your criteria or search keyword
              </p>
            </motion.div>
          </div>
        )
      )}
    </div>
  );
}

export default MovieHeroContent;

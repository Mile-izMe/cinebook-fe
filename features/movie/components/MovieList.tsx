"use client";
import { MovieSummaryResponse } from "../types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Film, Loader2 } from "lucide-react";
import { MoviesGridSkeleton } from "@/components";
import MovieCard from "./MovieCard";
import { useTranslations } from "next-intl";

interface MovieListProps {
  movies: MovieSummaryResponse[];
  isLoading: boolean;
  keyword: string;
  selectedGenre: string;
  hasMore: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  onMovieClick: (movie: MovieSummaryResponse) => void;
}

export default function MovieList({
  movies,
  isLoading,
  keyword,
  selectedGenre,
  hasMore,
  isFetchingNextPage,
  fetchNextPage,
  onMovieClick,
}: MovieListProps) {
  const t = useTranslations("movie");
  const { ref, inView } = useInView();

  // Scroll to end (inView = true) and exist data (hasMore), call API next page
  useEffect(() => {
    if (inView && hasMore && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasMore, isFetchingNextPage, fetchNextPage]);

  const handleMovieClick = (movie: MovieSummaryResponse) => {
    onMovieClick(movie);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Film className="w-5 h-5 text-brand-red" />
        <h2 className="text-xs font-black uppercase tracking-widest text-white">
          {keyword || selectedGenre !== "All"
            ? t("search_results")
            : t("now_playing")}
        </h2>
      </div>

      {isLoading ? (
        <MoviesGridSkeleton />
      ) : movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard
                onClick={() => handleMovieClick(movie)}
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>

          {/* Anchor to activate Fetch More */}
          <div ref={ref} className="py-4 flex justify-center">
            {isFetchingNextPage && (
              <Loader2 className="w-6 h-6 animate-spin text-brand-red" />
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-24 bg-brand-dark border border-white/5 rounded-2xl">
          <Film className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">
            {t("no_movies_found_criteria")}
          </p>
        </div>
      )}

      {/* Coming Soon Section */}
      {/* {selectedGenre === "All" && !keyword && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-red" />
            <h2 className="text-xs font-black uppercase tracking-widest text-white">
              Coming Soon
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 opacity-65">
            {movies
              .slice()
              .reverse()
              .map((movie) => (
                <div
                  key={`soon-${movie.id}`}
                  className="pointer-events-none select-none"
                >
                  <MovieCard movie={{ ...movie }} />
                </div>
              ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

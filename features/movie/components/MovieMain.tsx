"use client";
import { useDebounce } from "@/hooks";
import { useEffect, useState } from "react";
import { useMovies } from "../hooks";
import { MovieSummaryResponse } from "../types";
import FilterContainer from "./FilterContainer";
import MovieHeroContent from "./MovieHeroContent";
import MovieList from "./MovieList";

function MovieMain() {
  const [keyword, setKeyword] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [clickedMovie, setClickedMovie] = useState<MovieSummaryResponse | null>(
    null,
  );
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMovies(
      debouncedKeyword || undefined,
      selectedGenre !== "All" ? selectedGenre : undefined,
    );
  const movies = data?.pages.flatMap((page) => page.data) ?? [];

  const isClickedMovieValid = movies.some((m) => m.id === clickedMovie?.id);
  const heroMovie = isClickedMovieValid ? clickedMovie : (movies[0] ?? null);

  return (
    <div className="flex-grow bg-brand-black pb-16">
      <MovieHeroContent selectedMovie={heroMovie} isLoading={isLoading} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        <FilterContainer
          keyword={keyword}
          setKeyword={setKeyword}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />

        <MovieList
          movies={movies}
          isLoading={isLoading}
          keyword={keyword}
          selectedGenre={selectedGenre}
          hasMore={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onMovieClick={(movie) => setClickedMovie(movie)}
        />
      </div>
    </div>
  );
}

export default MovieMain;

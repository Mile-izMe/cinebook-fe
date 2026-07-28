import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useGenres } from "../hooks";

interface FilterContainerProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

function FilterContainer({
  selectedGenre,
  setSelectedGenre,
  keyword,
  setKeyword,
}: FilterContainerProps) {
  const { data: genres } = useGenres();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-5 justify-between items-start md:items-center bg-brand-dark/60 border border-white/5 p-5 rounded-2xl backdrop-blur-md">
        {/* Search bar */}
        <div className="relative w-full md:max-w-md shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search movies, genres, or directors..."
            className="w-full bg-black border border-white/5 rounded-xl pl-11 pr-4 py-3 text-xs uppercase tracking-wider font-bold text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red"
          />
        </div>

        <div className="relative flex flex-1 w-full group overflow-hidden items-center">
          {/* Left Arrow: Default hide (opacity-0), hover appear (group-hover:opacity-100) */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 bg-black/80 hover:bg-brand-red text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] -ml-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Genres View */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto w-full pb-1 md:pb-0 scrollbar-none scroll-smooth px-2"
          >
            <button
              onClick={() => setSelectedGenre("All")}
              className={`px-4 py-2.5 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all whitespace-nowrap border shrink-0 ${
                selectedGenre === "All"
                  ? "bg-brand-red border-brand-red text-white shadow-lg"
                  : "bg-black border-white/5 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              All
            </button>
            {genres?.data.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-4 py-2.5 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all whitespace-nowrap border shrink-0 ${
                  selectedGenre === genre.id
                    ? "bg-brand-red border-brand-red text-white shadow-lg"
                    : "bg-black border-white/5 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 bg-black/80 hover:bg-brand-red text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] -mr-2"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterContainer;

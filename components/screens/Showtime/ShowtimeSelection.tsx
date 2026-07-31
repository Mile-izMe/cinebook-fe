"use client";
import { useState } from "react";
import SidebarFilters from "./SidebarFilters";

function ShowtimeSelection() {
  const [selectedCityId, setSelectedCityId] = useState<string | undefined>();
  const [selectedFormat, setSelectedFormat] = useState<string>("All");

  return (
    <div className="flex-grow bg-brand-black pb-20">
      {/* Top Breadcrumb Header */}
      {/* <div className="bg-brand-dark/40 border-b border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
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
                {movie.genre.join(", ")} • {movie.duration} MINS
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
            <span className="text-brand-red">1. Showtime</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>2. Seats</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>3. Checkout</span>
          </div>
        </div>
      </div> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <SidebarFilters
          selectedCityId={selectedCityId}
          setSelectedCityId={setSelectedCityId}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
        />
      </div>
    </div>
  );
}

export default ShowtimeSelection;

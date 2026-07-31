"use client";
import { ShowtimePageSkeleton } from "@/components";
import { MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { useCities } from "../hooks";

interface CitySelectionProps {
  selectedCityId: string | undefined;
  setSelectedCityId: (cityId: string | undefined) => void;
}

export default function CitySelection({
  selectedCityId,
  setSelectedCityId,
}: CitySelectionProps) {
  const { data, isLoading } = useCities();
  const cities = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  // Derived State
  // If selectedCity has value -> Use
  // If selectedCity is undefined (render) -> Use ID of the first city
  const activeCityId = selectedCityId ?? cities[0]?.id;

  if (isLoading) {
    return <ShowtimePageSkeleton />;
  }

  return (
    <div className="bg-brand-dark border border-white/5 rounded-2xl p-5 space-y-3">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
        <MapPin className="w-4 h-4 text-brand-red" />
        <span>Select City</span>
      </h3>
      <div className="flex flex-col gap-2 pt-1">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => setSelectedCityId(city.id)}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
              activeCityId === city.id
                ? "bg-brand-red/10 border-brand-red/50 text-brand-red"
                : "bg-black border-white/5 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            {city.cityName}
          </button>
        ))}
      </div>
    </div>
  );
}

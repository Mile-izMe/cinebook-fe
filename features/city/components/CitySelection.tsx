"use client";
import { MapPin } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useCities } from "../hooks";

export default function CitySelection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCityId = searchParams.get("cityId");

  const { data } = useCities();
  const cities = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const setCityToUrl = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("cityId", id);

      // push new URL, scroll: false to help page not scroll to top
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  useEffect(() => {
    if (cities.length > 0 && !selectedCityId) {
      setCityToUrl(cities[0].id);
    }
  }, [cities, selectedCityId, setCityToUrl]);

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
            onClick={() => setCityToUrl(city.id)}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
              selectedCityId === city.id
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

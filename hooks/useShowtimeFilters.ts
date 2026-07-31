"use client";

import { ShowtimeQueryParams } from "@/features/showtime";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useShowtimeFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => ({
      cityId: searchParams.get("cityId") ?? undefined,
      cinemaId: searchParams.get("cinemaId") ?? undefined,
      format: searchParams.get("format") ?? undefined,
      date: searchParams.get("date") ?? undefined,
    }),
    [searchParams],
  );

  const updateFilter = useCallback(
    (updates: Partial<ShowtimeQueryParams>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value == null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    },
    [pathname, searchParams],
  );

  return {
    filters,
    updateFilter,
  };
}

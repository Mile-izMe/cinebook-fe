"use client";

import { CityResponse } from "@/features/city";
import { generateDateOptions } from "@/lib";
import { useEffect } from "react";
import { useShowtimeFilters } from "./useShowtimeFilters";

interface Props {
  filters: ReturnType<typeof useShowtimeFilters>[0];
  setFilters: ReturnType<typeof useShowtimeFilters>[1];
  cities?: CityResponse[];
}

export function useInitializeShowtimeFilters({
  filters,
  setFilters,
  cities,
}: Props) {
  useEffect(() => {
    const updates: Record<string, string | null> = {};

    // Default city
    if (!filters.cityId && cities?.length) {
      updates.cityId = cities[0].id;
    }

    // Default date
    if (!filters.date) {
      updates.date = generateDateOptions(7)[0].date;
    }

    if (Object.keys(updates).length > 0) {
      setFilters(updates);
    }
  }, [filters, cities, setFilters]);
}

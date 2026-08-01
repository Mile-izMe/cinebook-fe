"use client";

import { parseAsString, useQueryStates } from "nuqs";

export const showtimeFilterParsers = {
  cityId: parseAsString,
  cinemaId: parseAsString,
  format: parseAsString,
  date: parseAsString,
} as const;

export function useShowtimeFilters() {
  return useQueryStates(showtimeFilterParsers);
}

export type ShowtimeFilters = {
  cityId: string | null;
  cinemaId: string | null;
  format: string | null;
  date: string | null;
};

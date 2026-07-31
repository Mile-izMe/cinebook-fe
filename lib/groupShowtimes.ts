import { Showtime } from "@/features/showtime";

export interface CinemaGroup {
  cinemaId: string;
  cinemaName: string;
  cinemaAddress: string;
  showtimes: Showtime[];
}

export function groupShowtimesByCinema(showtimes: Showtime[]): CinemaGroup[] {
  const map = new Map<string, CinemaGroup>();

  showtimes.forEach((showtime) => {
    if (!map.has(showtime.cinemaId)) {
      map.set(showtime.cinemaId, {
        cinemaId: showtime.cinemaId,
        cinemaName: showtime.cinemaName,
        cinemaAddress: showtime.cinemaAddress,
        showtimes: [],
      });
    }

    map.get(showtime.cinemaId)!.showtimes.push(showtime);
  });

  return [...map.values()];
}

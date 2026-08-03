export interface SeatMapResponse {
  showtimeId: string;
  movie: MovieSummary;
  cinema: CinemaSummary;
  room: RoomSummary;
  rows: SeatMapRow[];
}

export interface MovieSummary {
  id: string;
  title: string;
  posterUrl: string;
  duration: number;
}

export interface CinemaSummary {
  id: string;
  name: string;
  address: string;
}

export interface RoomSummary {
  id: string;
  name: string;
}

export interface SeatMapRow {
  row: string;
  seats: SeatMapSeat[];
}

export interface SeatMapSeat {
  seatId: string;
  label: string;
  type: SeatType;
  price: number;
  status: SeatStatus;
}

export type SeatType = "STANDARD" | "VIP" | "COUPLE" | "WHEELCHAIR";

export type SeatStatus = "AVAILABLE" | "RESERVED" | "SOLD";

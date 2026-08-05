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
  genreNames: string[];
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

export interface BookingResponse {
  bookingId: string;
  movie: string;
  cinema: string;
  address: string;
  room: string;
  showtime: string; // Instant -> ISO 8601 string
  seats: string[];
  totalPrice: number;
  status: BookingStatus;
  bookingTime: string; // Instant -> ISO 8601 string
}

export interface BookingSummaryResponse {
  bookingId: string;
  movieName: string;
  posterUrl: string;
  seats: string[];
  showtimeStart: string;
  totalPrice: number;
  status: BookingStatus;
}

export type SeatType = "STANDARD" | "VIP" | "COUPLE" | "WHEELCHAIR";

export type SeatStatus = "AVAILABLE" | "RESERVED" | "SOLD";

export enum BookingStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  USED = "USED",
}

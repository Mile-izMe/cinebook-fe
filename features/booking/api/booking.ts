import api from "@/lib/api";
import { ApiResponse, CursorQueryParams } from "@/types";
import {
  BookingResponse,
  BookingSummaryResponse,
  SeatMapResponse,
} from "../types";
import { BookingInputForGuest, CreateBookingInput } from "../validations";

export const bookingApi = {
  getSeatMap: (showtimeId: string): Promise<ApiResponse<SeatMapResponse>> =>
    api.get(`/api/showtimes/${showtimeId}/seats`),

  createBooking: (
    data: CreateBookingInput,
  ): Promise<ApiResponse<BookingResponse>> => api.post("/api/bookings", data),

  getBookingHistory: (
    params: CursorQueryParams,
  ): Promise<ApiResponse<BookingSummaryResponse[]>> =>
    api.get("/api/bookings/me", {
      params,
    }),

  getBookingDetail: (id: string): Promise<ApiResponse<BookingResponse>> =>
    api.get(`/api/bookings/${id}`),

  cancelBooking: (id: string): Promise<void> => api.post(`/api/bookings/${id}`),

  // =============== GUEST (NOT LOGIN) =================
  lookupBooking: (
    params: BookingInputForGuest,
  ): Promise<ApiResponse<BookingResponse>> =>
    api.get("/api/bookings/guest/lookup", {
      params,
    }),

  cancelBookingGuest: (request: BookingInputForGuest): Promise<void> =>
    api.post("/api/bookings/guest/cancel", request),
};

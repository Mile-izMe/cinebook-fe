import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { SeatMapResponse } from "../types";

export const bookingApi = {
  getSeatMap: (showtimeId: string): Promise<ApiResponse<SeatMapResponse>> =>
    api.get(`/api/showtimes/${showtimeId}/seats`),
};

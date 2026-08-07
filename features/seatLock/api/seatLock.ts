import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { SeatLock } from "../types";
import { SeatExtendInput, SeatUnlockingInput } from "../validations";
import { SeatLockingInput } from "./../validations";

const BASE_URL = "/api/seat-locks";

export const seatLockApi = {
  lockSeat: (data: SeatLockingInput): Promise<ApiResponse<SeatLock[]>> =>
    api.post(BASE_URL, data),

  unlockSeat: (data: SeatUnlockingInput): Promise<void> =>
    api.delete(BASE_URL, { data: data }),

  getLockedSeats: (showtimeId: string): Promise<ApiResponse<string[]>> =>
    api.get(`${BASE_URL}/showtimes/${showtimeId}`),

  extendLockTime: (data: SeatExtendInput): Promise<ApiResponse<void>> =>
    api.patch(`${BASE_URL}/extend`, data),
};

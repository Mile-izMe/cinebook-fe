import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { Room } from "../types";
import { CreateRoomInput } from "../validation";

export const roomApi = {
  getRoomsByCinemaId: (id: string): Promise<ApiResponse<Room[]>> =>
    api.get(`/api/cinemas/${id}/rooms`),

  createRoom: (id: string, data: CreateRoomInput): Promise<ApiResponse<Room>> =>
    api.post(`/api/cinemas/${id}/rooms`, data),
};

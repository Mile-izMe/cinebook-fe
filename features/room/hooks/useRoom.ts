import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateRoomInput } from "../validation";
import { roomApi } from "../api";

export const useRoomsByCinemaId = (cinemaId: string) => {
  return useQuery({
    queryKey: ["rooms", cinemaId],
    queryFn: () => roomApi.getRoomsByCinemaId(cinemaId),
    enabled: !!cinemaId, // Chặn không cho gọi API nếu chưa có cinemaId
  });
};

export const useCreateRoom = (cinemaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoomInput) => roomApi.createRoom(cinemaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms", cinemaId] });
    },
  });
};

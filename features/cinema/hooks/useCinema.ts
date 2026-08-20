import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cinemaApi } from "../api";
import { CreateCinemaInput, UpdateCinemaInput } from "../validation";

export const useCinemas = (cityId?: string) => {
  return useQuery({
    queryKey: ["cinemas", cityId],
    queryFn: () => cinemaApi.getCinemas(cityId),
  });
};

export const useCinemaDetail = (id: string) => {
  return useQuery({
    queryKey: ["cinemas", id],
    queryFn: () => cinemaApi.getCinemaDetail(id),
    enabled: !!id, // Chỉ chạy khi có id
  });
};

export const useCreateCinema = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCinemaInput) => cinemaApi.createCinema(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cinemas"] });
    },
  });
};

export const useUpdateCinema = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCinemaInput) => cinemaApi.updateCinema(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cinemas"] });
    },
  });
};

export const useDeleteCinema = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cinemaApi.deleteCinema(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cinemas"] });
    },
  });
};

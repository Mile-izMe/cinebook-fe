import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cityApi } from "../api";
import { toast } from "sonner";

export const useCreateCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cityApi.createCity,
    onSuccess: () => {
      toast.success("Create city success!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error) => {
      toast.error("Error creating city!");
    },
  });
};

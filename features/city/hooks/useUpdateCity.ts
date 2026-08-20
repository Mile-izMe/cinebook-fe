import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cityApi } from "../api";
import { toast } from "sonner";

export const useUpdateCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cityApi.updateCity,
    onSuccess: () => {
      toast.success("Update city success!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error) => {
      toast.error("Error when editing city!");
    },
  });
};

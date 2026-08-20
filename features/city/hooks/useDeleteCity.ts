import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cityApi } from "../api";
import { toast } from "sonner";

export const useDeleteCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cityApi.deleteCity(id),
    onSuccess: () => {
      toast.success("Xóa thành công!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: () => {
      toast.error("Lỗi khi xóa!");
    },
  });
};

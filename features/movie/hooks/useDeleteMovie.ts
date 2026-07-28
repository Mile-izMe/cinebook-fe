import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { movieApi } from "../api";

export const useDeleteMovie = () => {
  const t = useTranslations("movie");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => movieApi.deleteMovie(id),
    onSuccess: () => {
      toast.success(t("delete_movie_success"));
      queryClient.invalidateQueries({ queryKey: ["movie"] });
    },
    onError: () => {
      toast.error(t("delete_movie_fail"));
    },
  });
};

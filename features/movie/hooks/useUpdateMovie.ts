import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { movieApi } from "../api";
import { UpdateMovieInput } from "../validation";

export const useUpdateMovie = (id: string) => {
  const t = useTranslations("movie");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMovieInput) => movieApi.updateMovie(id, data),
    onSuccess: () => {
      toast.success(t("update_movie_success"));
      queryClient.invalidateQueries({ queryKey: ["movie"] });
      queryClient.invalidateQueries({ queryKey: ["movie", "detail", id] });
    },
    onError: () => {
      toast.error(t("update_movie_fail"));
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { movieApi } from "../api";
import { UpdateMovieInput } from "../validation";

export type UpdateMoviePayload = {
  id: string;
} & UpdateMovieInput;

export const useUpdateMovie = () => {
  const t = useTranslations("movie");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateMoviePayload) =>
      movieApi.updateMovie(id, data),
    onSuccess: (_, variables) => {
      toast.success(t("update_movie_success"));
      queryClient.invalidateQueries({ queryKey: ["movie"] });
      queryClient.invalidateQueries({ queryKey: ["movie", variables.id] });
    },
    onError: () => {
      toast.error(t("update_movie_fail"));
    },
  });
};

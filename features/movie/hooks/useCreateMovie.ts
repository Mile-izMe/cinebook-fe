import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { movieApi } from "../api";
import { CreateMovieInput } from "../validation";

export const useCreateMovie = () => {
  const t = useTranslations("movie");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMovieInput) => movieApi.createMovie(data),
    onSuccess: () => {
      toast.success(t("create_movie_success"));
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: () => {
      toast.error(t("create_movie_fail"));
    },
  });
};

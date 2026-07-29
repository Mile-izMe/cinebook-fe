import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { reviewApi } from "../api";
import { CreateReviewInput } from "../validation";

export const useCreateReview = (movieId: string) => {
  const t = useTranslations("review");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewInput) =>
      reviewApi.createReview(movieId, data),
    onSuccess: () => {
      toast.success(t("create_review_success"));
      queryClient.invalidateQueries({ queryKey: ["movie-reviews"] });
    },
    onError: () => {
      toast.error(t("create_review_fail"));
    },
  });
};

import { z } from "zod";

type MessageGetter = (key: string) => string;

export const createReviewSchema = (t: MessageGetter) =>
  z.object({
    rating: z.number().min(1, t("rating_min")).max(5, t("rating_max")),
    comment: z.string().trim().optional(),
  });

export type CreateReviewInput = z.infer<ReturnType<typeof createReviewSchema>>;

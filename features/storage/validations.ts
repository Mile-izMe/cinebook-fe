import { z } from "zod";

type MessageGetter = (key: string) => string;

export const UPLOAD_TYPES = [
  "AVATAR",
  "MOVIE_POSTER",
  "MOVIE_BACKDROP",
] as const;

export const presignUrlSchema = (t: MessageGetter) =>
  z.object({
    fileName: z.string().trim().min(1, t("fileName_required")),
    contentType: z.string().trim().min(1, t("contentType_required")),
    type: z.enum(UPLOAD_TYPES),
  });

export type PresignUrlInput = z.infer<ReturnType<typeof presignUrlSchema>>;

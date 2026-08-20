import { z } from "zod";

export const updateProfileSchema = () =>
  z.object({
    userName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    avatarUrl: z.string().optional(),
  });

export type UpdateProfileInput = z.infer<
  ReturnType<typeof updateProfileSchema>
>;

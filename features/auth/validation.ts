import { z } from "zod";

type MessageGetter = (key: string) => string;

export const createLoginSchema = (t: MessageGetter) =>
  z.object({
    email: z.string().email(t("email_invalid")),
    password: z.string().min(6, t("password_min_length")),
  });

export const createRegisterSchema = (t: MessageGetter) =>
  z
    .object({
      userName: z.string().min(3, t("username_min_length")),
      email: z.string().email(t("email_invalid")),
      phone: z.string().min(10, t("phone_min_length")),
      password: z.string().min(6, t("password_min_length")),
      confirmPassword: z.string(),
    })

export const createRefreshTokenSchema = () =>
  z.object({
    refreshToken: z.string().nonempty(),
  });

export type LoginInput = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterInput = z.infer<ReturnType<typeof createRegisterSchema>>;
export type RefreshTokenInput = z.infer<
  ReturnType<typeof createRefreshTokenSchema>
>;
